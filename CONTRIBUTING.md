# Contributing to MCP Kit

Thank you for your interest in contributing to MCP Kit! This document provides guidelines for contributions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/mcp-kit.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev
```

## Project Structure

```
mcp-kit/
├── src/
│   ├── index.ts      # MCP server and tool definitions
│   └── kit-client.ts # Kit.com API client
├── dist/             # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Adding New Tools

### 1. Add the API Method

Add the method to `src/kit-client.ts`:

```typescript
async myNewMethod(params: MyParams): Promise<MyResponse> {
  return this.request("/my-endpoint", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
```

### 2. Register the Tool

Add the tool definition to `src/index.ts`:

```typescript
server.tool(
  "kit_my_new_tool",
  "Description of what this tool does",
  {
    param1: z.string().describe("Description of param1"),
    param2: z.number().optional().describe("Optional param2"),
  },
  async ({ param1, param2 }) => {
    try {
      const result = await client.myNewMethod({ param1, param2 });
      return formatResponse(result);
    } catch (error) {
      return formatError(error);
    }
  }
);
```

### 3. Build and Test

```bash
npm run build
# Test manually with your Kit.com API key
KIT_API_KEY=your-key npm start
```

## Code Style Guidelines

- Use TypeScript with strict typing
- Follow existing patterns for tool registration
- Use Zod for parameter validation
- Include descriptive tool and parameter descriptions
- Handle errors consistently using `formatError()`

## Commit Messages

Use clear, descriptive commit messages:
- `feat: add broadcast stats tool`
- `fix: handle pagination edge case`
- `docs: update README with new examples`
- `refactor: simplify error handling`

## Pull Request Process

1. Ensure your code builds without errors: `npm run build`
2. Update README.md if adding new tools or features
3. Update CLAUDE.md if changing architecture or patterns
4. Create a pull request with a clear description of changes

## Kit.com API Reference

- [Kit.com API v4 Documentation](https://developers.kit.com/)
- The API uses cursor-based pagination
- Authentication is via `X-Kit-Api-Key` header

## Questions?

Open an issue for questions or discussions about potential contributions.
