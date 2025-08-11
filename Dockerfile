# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Add metadata labels
LABEL maintainer="Hypernative <support@hypernative.io>"
LABEL org.opencontainers.image.title="Hypernative CLI"
LABEL org.opencontainers.image.description="Hypernative configuration management CLI for monitoring and security workflows"
LABEL org.opencontainers.image.vendor="Hypernative"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/hypernative/cli"

# Install security updates and required packages
RUN apk update && apk upgrade && \
    apk add --no-cache \
    ca-certificates \
    curl \
    git \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1000 hypernative && \
    adduser -D -u 1000 -G hypernative hypernative

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=hypernative:hypernative /app/dist ./dist
COPY --from=builder --chown=hypernative:hypernative /app/bin ./bin
COPY --from=builder --chown=hypernative:hypernative /app/package*.json ./
COPY --from=builder --chown=hypernative:hypernative /app/node_modules ./node_modules

# Make binary executable
RUN chmod +x bin/hypernative

# Create directories for configuration and data
RUN mkdir -p /home/hypernative/.hypernative && \
    mkdir -p /app/workspace && \
    chown -R hypernative:hypernative /home/hypernative/.hypernative && \
    chown -R hypernative:hypernative /app/workspace

# Switch to non-root user
USER hypernative

# Set environment variables
ENV NODE_ENV=production
ENV HYPERNATIVE_HOME=/home/hypernative/.hypernative
ENV WORKSPACE_DIR=/app/workspace

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node dist/index.js --version || exit 1

# Volume for persistent data
VOLUME ["/home/hypernative/.hypernative", "/app/workspace"]

# Set the working directory to workspace for convenience
WORKDIR /app/workspace

# Default entrypoint
ENTRYPOINT ["node", "/app/dist/index.js"]

# Default command (help)
CMD ["--help"]