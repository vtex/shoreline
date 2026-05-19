# Tool UI guide

> **Status:** experimental

Register React components for assistant tool calls. Requires `<AIProvider>` — see [PROVIDER.md](./PROVIDER.md).

## `makeAIToolUI`

```tsx
const SearchTool = makeAIToolUI({
  component: 'web-search',
  mode: 'widget',
  render: ({ args, result, status, toolName }) => (
    <div data-sl-ai-tool-ui="">
      <strong>{toolName}</strong> ({status})
    </div>
  ),
})
```

Mount registered tools once under `<AIProvider>`.

| Option | Default | Purpose |
|--------|---------|---------|
| `component` | — | Tool name from backend |
| `mode` | `'widget'` | `'widget'` inline or `'canvas'` side panel |
| `render` | — | Main UI |
| `trigger` | Built-in | Canvas mode: in-message control |
| `defaultOpen` | `false` | Canvas: open when tool arrives |

## `<AICanvas>`

```tsx
<AICanvas />
```

Renders the active canvas tool from `useAIContext().canvas`.

## `<AICanvasTrigger>` / `<AIToolFallback>`

- **Trigger** — standalone open button for custom canvas flows.
- **Fallback** — presentational unknown-tool UI; wire manually in your message renderer.
