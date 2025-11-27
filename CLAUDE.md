# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

MCP Kit is a Model Context Protocol server that provides tools for interacting with the Kit.com (formerly ConvertKit) email marketing API. It enables AI assistants to manage subscribers, tags, sequences, broadcasts, forms, custom fields, and webhooks.

## Build and Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Watch mode for development
npm run dev

# Run the server
npm start
```

## Architecture

```
src/
├── index.ts      # MCP server setup, tool definitions, request handlers
└── kit-client.ts # Kit.com API v4 client with typed methods
```

### Data Flow
1. MCP client sends tool request →
2. `index.ts` validates parameters with Zod →
3. `KitClient` makes authenticated HTTP request to Kit.com API v4 →
4. Response formatted and returned to MCP client

### Key Patterns

**Tool Registration:**
```typescript
server.tool(
  "tool_name",
  "Tool description",
  { /* Zod schema for parameters */ },
  async (params) => {
    // Implementation
  }
);
```

**API Client Methods:**
- All methods in `kit-client.ts` handle authentication via `X-Kit-Api-Key` header
- Pagination uses cursor-based approach (`after`, `per_page`)
- Returns typed `PaginatedResponse<T>` for list operations

## Adding New Tools

1. Add the API method to `kit-client.ts`
2. Register the tool in `index.ts` with appropriate Zod schema
3. Follow existing patterns for error handling and response formatting
4. Rebuild with `npm run build`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `KIT_API_KEY` | Yes | Kit.com API v4 key |

## API Reference

This server uses Kit.com API v4. Documentation: https://developers.kit.com/

### Tool Categories

| Category | Tool Count | Description |
|----------|------------|-------------|
| Account | 1 | Account information |
| Subscribers | 7 | CRUD + tag management |
| Tags | 6 | CRUD + subscriber listing |
| Sequences | 3 | List, get, add subscribers |
| Broadcasts | 5 | Full CRUD |
| Forms | 3 | List, get, add subscribers |
| Custom Fields | 1 | List fields |
| Webhooks | 3 | CRUD |

**Total: 29 tools**

## Testing

Test the server locally:
```bash
# Set environment variable
export KIT_API_KEY="your-api-key"

# Run the server
npm start
```

The server communicates via stdio using JSON-RPC protocol.
