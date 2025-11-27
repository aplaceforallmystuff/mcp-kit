# MCP Kit Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)

An MCP (Model Context Protocol) server that connects AI assistants like Claude to the [Kit.com](https://kit.com) (formerly ConvertKit) email marketing platform. Manage your email lists, subscribers, broadcasts, sequences, and more through natural language.

## Why Use This?

If you run a newsletter or email marketing on Kit.com, this MCP server lets you:

- **Manage subscribers** - List, create, update, and organize your email subscribers
- **Handle tags efficiently** - Create tags, add/remove tags from subscribers, list subscribers by tag
- **Work with sequences** - View email sequences and add subscribers to automated sequences
- **Create broadcasts** - Draft and manage email campaigns
- **Analyze your list** - Query subscriber data with filters (status, date ranges, custom fields)
- **Automate workflows** - Let Claude handle repetitive email marketing tasks

## Features

| Category | Tools |
|----------|-------|
| **Account** | Get account information |
| **Subscribers** | List, get, create, update, manage tags |
| **Tags** | List, create, update, delete, get subscribers by tag |
| **Sequences** | List, get, add subscribers |
| **Broadcasts** | List, get, create, update, delete |
| **Forms** | List, get, add subscribers |
| **Custom Fields** | List available fields |
| **Webhooks** | List, create, delete |

### Complete Tool Reference

**Account**
- `kit_get_account` - Get Kit.com account information

**Subscribers (7 tools)**
- `kit_list_subscribers` - List subscribers with filters (status, date ranges, pagination)
- `kit_get_subscriber` - Get a specific subscriber by ID
- `kit_create_subscriber` - Create a new subscriber
- `kit_update_subscriber` - Update subscriber details
- `kit_get_subscriber_tags` - Get all tags for a subscriber
- `kit_add_tag_to_subscriber` - Add a tag to a subscriber
- `kit_remove_tag_from_subscriber` - Remove a tag from a subscriber

**Tags (6 tools)**
- `kit_list_tags` - List all tags
- `kit_get_tag` - Get a specific tag
- `kit_create_tag` - Create a new tag
- `kit_update_tag` - Rename a tag
- `kit_delete_tag` - Delete a tag
- `kit_list_tag_subscribers` - List all subscribers with a specific tag

**Sequences (3 tools)**
- `kit_list_sequences` - List all email sequences
- `kit_get_sequence` - Get sequence details
- `kit_add_subscriber_to_sequence` - Add subscriber to a sequence

**Broadcasts (5 tools)**
- `kit_list_broadcasts` - List all broadcasts
- `kit_get_broadcast` - Get broadcast details
- `kit_create_broadcast` - Create a new broadcast
- `kit_update_broadcast` - Update a broadcast
- `kit_delete_broadcast` - Delete a broadcast

**Forms (3 tools)**
- `kit_list_forms` - List all forms
- `kit_get_form` - Get form details
- `kit_add_subscriber_to_form` - Add subscriber via form

**Custom Fields (1 tool)**
- `kit_list_custom_fields` - List all custom fields

**Webhooks (3 tools)**
- `kit_list_webhooks` - List configured webhooks
- `kit_create_webhook` - Create a new webhook
- `kit_delete_webhook` - Delete a webhook

## Prerequisites

- Node.js 18+
- A [Kit.com](https://kit.com) account
- Your Kit.com API key (v4 API)

## Installation

### Option 1: Clone and Build

```bash
git clone https://github.com/aplaceforallmystuff/mcp-kit.git
cd mcp-kit
npm install
npm run build
```

### Option 2: Install from npm (coming soon)

```bash
npm install -g mcp-kit
```

## Configuration

### 1. Get Your Kit.com API Key

1. Log in to [Kit.com](https://kit.com)
2. Navigate to Settings > Developer
3. Create a new API key or copy an existing v4 API key

### 2. Configure Your MCP Client

#### For Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "kit": {
      "command": "node",
      "args": ["/path/to/mcp-kit/dist/index.js"],
      "env": {
        "KIT_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

#### For Claude Code

```bash
claude mcp add kit -e KIT_API_KEY=your-api-key-here -- node /path/to/mcp-kit/dist/index.js
```

Or add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "kit": {
      "command": "node",
      "args": ["/path/to/mcp-kit/dist/index.js"],
      "env": {
        "KIT_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Usage Examples

Once configured, you can interact with Kit.com through natural language:

### Subscriber Management
> "Show me all active subscribers from the last 30 days"

> "Create a new subscriber with email user@example.com and tag them as 'newsletter'"

> "What tags does subscriber@example.com have?"

### Tag Operations
> "List all my tags and how many subscribers each has"

> "Create a tag called 'VIP Customers'"

> "Add the 'engaged' tag to all subscribers who signed up this month"

### Email Sequences
> "Show me all my email sequences"

> "Add user@example.com to the welcome sequence"

### Broadcasts
> "Create a draft broadcast with subject 'Weekly Update' and preview text 'This week in AI...'"

> "List all my recent broadcasts and their stats"

### Forms
> "Show me all active forms"

> "Add a subscriber to my main signup form"

## Development

```bash
# Run in development mode (watches for changes)
npm run dev

# Build for production
npm run build

# Run the built version
npm start
```

## Troubleshooting

### "KIT_API_KEY environment variable is required"
Ensure you have set the `KIT_API_KEY` environment variable in your MCP configuration.

### "Kit API error (401)"
Your API key is invalid or expired. Generate a new one from Kit.com Settings > Developer.

### "Kit API error (403)"
Your API key doesn't have permission for this operation. Check that you're using a v4 API key with appropriate scopes.

### "Kit API error (404)"
The resource (subscriber, tag, broadcast, etc.) was not found. Verify the ID is correct.

### "Kit API error (422)"
Invalid request data. Check that email addresses are valid and required fields are provided.

## API Reference

This server uses the [Kit.com API v4](https://developers.kit.com/). All tools support pagination where applicable using `per_page` and `after` cursor parameters.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Links

- [Kit.com](https://kit.com)
- [Kit.com API Documentation](https://developers.kit.com/)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)