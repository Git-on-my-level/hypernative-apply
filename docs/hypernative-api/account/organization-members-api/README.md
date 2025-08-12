---
description: >-
  Welcome to the Organization Members API documentation! This API is designed to
  facilitate the onboarding process for new members of an organization.
---

# Organization Members

Hypernative users, whether human or programmable (API keys) have assigned roles controlling their permitted actions.

The roles in the Hypernative platform are:

1. **Organization Admin**
2. **Organization Member**
3. **Organization Viewer**

## Roles and Permissions

### 1. **Organization** Admin

The Organization Admin has the highest level of access and is responsible for managing the organization. This includes adding or removing members, assigning roles, and managing organization settings.

**Permissions:**

* [x] Add/Remove Organization Members.
* [x] Assign/Change roles of Organization Members.
* [x] Change Organization Member account information (i.e. name, email, password).
* [x] Get all Organization Members count/existence/data
* [x] Access and Manage all configuration resources
* [x] Execute Automated Response
* [x] Change System Notification settings

***

### 2. **Organization** Member

The Organization Member is an active member of the organization with permission to access and manage specific resources of its own account, assigned by the Organization Admin.

**Permissions:**

* [x] Get Member account information.
* [x] Change Member account information (i.e. name, email, password)
* [x] Access and Manage all configuration resources, **except** Member-management actions (such Add/Remove Members)

***

### 3. **Organization** Viewer

The Organization Viewer has read-only access to specific resources assigned by the Organization Admin. This role is suitable for external collaborators or stakeholders who need to view data but should not be able to make changes.

**Permissions:**

* [x] Get Viewer account information.
* [x] Change Viewer account information (i.e. name, email, password)
* [x] View all system configuration, Alerts etc., **without changing** any configuration

***

### API Endpoints

Our Organization Members API provides a set of endpoints that allow you to manage organization members, their roles, and access to resources. Here are some key endpoints:

* <mark style="color:blue;">**GET**</mark>\*\* /members\*\*: Retrieve a list of all organization members.
* <mark style="color:blue;">**GET**</mark>\*\* /members/count\*\*: Retrieve the number of all organization members.
* <mark style="color:blue;">**GET**</mark>\*\* /members/{member-Id}\*\*: Retrieve the resources assigned to a specific organization member.
* <mark style="color:blue;">**GET**</mark>\*\* /members/{member-Id}/exists\*\*: Returns True whether or not a certain user exists.
* <mark style="color:orange;">**PATCH**</mark> **/members/{member-Id}:** Update the details of a specific organization member.
* <mark style="color:red;">**DELETE**</mark>\*\* /members/{member-Id}\*\*: Remove a specific member from the organization.
* <mark style="color:green;">**POST**</mark>\*\* /members/add-member\*\*: Add a new member to the organization.
* <mark style="color:green;">**POST**</mark>\*\* /members/{member-Id}/assign-role\*\*: Assign a new role to a member of the organization.
* <mark style="color:green;">**POST**</mark>\*\* /members/{member-Id}/reset-password\*\*: Reset a member's password.

**Legend:**

**`v - full permission`**

**`v* - Only for the user`**

<table><thead><tr><th width="417">API</th><th width="106">Admin</th><th width="102">Member</th><th>Viewer</th></tr></thead><tbody><tr><td><mark style="color:blue;"><strong>GET</strong></mark><strong> /members</strong></td><td><strong><code>v</code></strong></td><td><strong><code>v*</code></strong></td><td><strong><code>v*</code></strong></td></tr><tr><td><mark style="color:blue;"><strong>GET</strong></mark><strong> /members/count</strong></td><td><strong><code>v</code></strong></td><td><strong><code>v*</code></strong></td><td><strong><code>v*</code></strong></td></tr><tr><td><mark style="color:blue;"><strong>GET</strong></mark><strong> /members/{member-Id}</strong></td><td><strong><code>v</code></strong></td><td><strong><code>v*</code></strong></td><td><strong><code>v*</code></strong></td></tr><tr><td><mark style="color:blue;"><strong>GET</strong></mark><strong> /members/{member-Id}/exists</strong></td><td><strong><code>v</code></strong></td><td><strong><code>v*</code></strong></td><td><strong><code>v*</code></strong></td></tr><tr><td><mark style="color:orange;"><strong>PATCH</strong></mark> <strong>/members/{member-Id}</strong></td><td><strong><code>v</code></strong></td><td></td><td></td></tr><tr><td><mark style="color:red;"><strong>DELETE</strong></mark><strong> /members/{member-Id}</strong></td><td><strong><code>v</code></strong></td><td></td><td></td></tr><tr><td><mark style="color:green;"><strong>POST</strong></mark><strong> /members/add-member</strong></td><td><strong><code>v</code></strong></td><td></td><td></td></tr><tr><td><mark style="color:green;"><strong>POST</strong></mark><strong> /members/{member-Id}/assign-role</strong></td><td><strong><code>v</code></strong></td><td></td><td></td></tr><tr><td><mark style="color:green;"><strong>POST</strong></mark><strong> /members/{member-Id}/reset-password</strong></td><td><strong><code>v</code></strong></td><td></td><td></td></tr></tbody></table>

***

### Authentication

Access to the API is secured using API tokens. Each request to the API must include a valid API token in the `Authorization` header. Organization Admins can generate and manage API tokens through the organization's settings page.

***

### Getting Started

To start using the Organization Members API, you need to:

1. Be an Organization Admin to generate an API token.
2. Use the API token to authenticate your requests.
3. Start making requests to the API endpoints.
