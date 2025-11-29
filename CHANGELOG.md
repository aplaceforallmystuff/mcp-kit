# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.1] - 2025-11-27

### Added
- MCP registry support with `server.json`
- Published to npm as `kit-mcp-server`

### Changed
- Updated README with npm installation instructions

## [1.0.0] - 2025-11-27

### Added
- Initial release with MCP tools for Kit.com (ConvertKit) email marketing
- **Account tools:**
  - `kit_get_account` - Get Kit.com account information
- **Subscriber management (7 tools):**
  - `kit_list_subscribers` - List subscribers with filters (status, date ranges, pagination)
  - `kit_get_subscriber` - Get a specific subscriber by ID
  - `kit_create_subscriber` - Create a new subscriber
  - `kit_update_subscriber` - Update subscriber details
  - `kit_get_subscriber_tags` - Get all tags for a subscriber
  - `kit_add_tag_to_subscriber` - Add a tag to a subscriber
  - `kit_remove_tag_from_subscriber` - Remove a tag from a subscriber
- **Tag management (6 tools):**
  - `kit_list_tags` - List all tags
  - `kit_get_tag` - Get a specific tag
  - `kit_create_tag` - Create a new tag
  - `kit_update_tag` - Rename a tag
  - `kit_delete_tag` - Delete a tag
  - `kit_list_tag_subscribers` - List all subscribers with a specific tag
- **Sequence management (3 tools):**
  - `kit_list_sequences` - List all email sequences
  - `kit_get_sequence` - Get sequence details
  - `kit_add_subscriber_to_sequence` - Add subscriber to a sequence
- **Broadcast management (5 tools):**
  - `kit_list_broadcasts` - List all broadcasts
  - `kit_get_broadcast` - Get broadcast details
  - `kit_create_broadcast` - Create a new broadcast
  - `kit_update_broadcast` - Update a broadcast
  - `kit_delete_broadcast` - Delete a broadcast
- **Form management (3 tools):**
  - `kit_list_forms` - List all forms
  - `kit_get_form` - Get form details
  - `kit_add_subscriber_to_form` - Add subscriber via form
- **Other tools:**
  - `kit_list_custom_fields` - List available custom fields
  - `kit_list_webhooks` - List configured webhooks
  - `kit_create_webhook` - Create a new webhook
  - `kit_delete_webhook` - Delete a webhook
