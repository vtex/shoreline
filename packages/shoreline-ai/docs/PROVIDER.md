# Provider guide

> **Status:** experimental

`<AIProvider>` wraps your chat UI with Shoreline context and Assistant-UI. Build the runtime first — see [RUNTIME.md](./RUNTIME.md).

## `<AIProvider>`

```tsx
<AIProvider
  runtime={runtime}
  threadId={activeThreadId}
  onThreadChange={setActiveThreadId}
  debugStream={false}
>
  {children}
</AIProvider>
```

| Prop | Purpose |
|------|---------|
| `runtime` | From `useRuntime(built)` — required |
| `threadId` | Controlled persistence id (e.g. conversation id) |
| `onThreadChange` | Fired when active thread id changes |
| `debugStream` | Enables stream debug — see [RUNTIME.md](./RUNTIME.md) |

When `threadId` is passed as a prop, the provider is **controlled**: switching between two non-null ids clears the thread UI via `runtime.thread.reset([])`. Promoting `null` → a new id (e.g. first conversation from the transport) does **not** reset, so in-flight stream messages are preserved.

## `useAIContext()`

```ts
const { runtime, threadId, canvas, openCanvas, closeCanvas } = useAIContext()
```

| Field | Purpose |
|-------|---------|
| `runtime` | `AIRuntime` — advanced control (`reset`, `cancelRun`) |
| `threadId` | Active persistence id |
| `canvas` | Active canvas tool state |
| `openCanvas` / `closeCanvas` | Canvas-mode tool UIs |

`threadId` is **not** passed to `StreamTransport` automatically. Your transport should read the active id from refs or closure.

Thread changes: use [`useAIThread().switchThread`](./HOOKS.md) — do not mutate thread id outside hooks.

## Canvas

Place `<AICanvas />` in your layout for canvas-mode tools. See [TOOL-UI.md](./TOOL-UI.md).
