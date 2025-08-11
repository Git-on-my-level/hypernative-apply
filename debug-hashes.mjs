import { TestFixture } from './tests/utils/test-helpers.js';
import { generateFingerprint } from './src/lib/fingerprint.js';

const config = TestFixture.createMockConfig();
console.log('Config test-slack hash:', generateFingerprint(config.notification_channels['test-slack']));
console.log('Config test-email hash:', generateFingerprint(config.notification_channels['test-email']));
console.log('Config test-watchlist hash:', generateFingerprint(config.watchlists['test-watchlist']));
console.log('Config test-agent hash:', generateFingerprint(config.custom_agents['test-agent']));

const state = TestFixture.createMockState();
console.log('State test-slack hash:', state.resources['test-slack'].last_applied_hash);
console.log('State test-watchlist hash:', state.resources['test-watchlist'].last_applied_hash);