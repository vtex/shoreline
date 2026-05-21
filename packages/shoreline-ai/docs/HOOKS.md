# Hooks guide

> **Status:** experimental

Use inside `<AIProvider>`. Runtime setup: [RUNTIME.md](./RUNTIME.md). Provider props: [PROVIDER.md](./PROVIDER.md).

## `useAIThread()`

```ts
const {
  messages,
  threadId,
  isEmpty,
  isOpeningThread,
  error,
  sendMessage,
  stopGeneration,
  switchThread,
  createThread,
  loadMessages,
} = useAIThread()
```

| Member | Description |
|--------|-------------|
| `messages` | Current thread as `AIMessage[]` |
| `threadId` | Active persistence id |
| `isEmpty` | `true` when the active thread has no messages |
| `isOpeningThread` | `true` while initial thread open is pending |
| `error` | `AIThreadError \| null` (e.g. `thread_open`) |
| `sendMessage` | Append user message and start a run |
| `stopGeneration` | Cancel active run (`abortSignal`) |
| `switchThread` | Cancel, clear UI, update thread id |
| `createThread` | New id, clear UI, set active |
| `loadMessages` | Replace thread content from `AIMessage[]` |

Thread layout (`AIThread*`, empty slot, footer): [THREAD.md](./THREAD.md).

### `sendMessage`

Text shorthand:

```ts
sendMessage({ text: 'Hello' })
```

Parts (text, file, image):

```ts
sendMessage({
  parts: [
    { type: 'text', text: 'Analyze this' },
    { type: 'file', uri: 'https://…', name: 'doc.pdf', mimeType: 'application/pdf' },
    { type: 'image', uri: 'data:image/png;base64,…', name: 'scan.png' },
  ],
})
```

### Multi-thread flow

```ts
switchThread(newId)
// fetch AIMessage[] for newId from your API
loadMessages(history)
```

`switchThread` clears the in-memory thread and updates `threadId`. Fetch and hydrate in your app layer.

## `useAIComposer()`

```ts
const { text, disabled, attachments, setText, send, reset } = useAIComposer()
```

| Member | Description |
|--------|-------------|
| `text` | Current draft in the composer |
| `disabled` | `true` when send is not allowed (`!canSend`) |
| `attachments` | Pending attachments before send |
| `setText` | Updates draft text |
| `send` | Same as `ComposerPrimitive.Send` |
| `reset` | Clears draft text and attachments |

Use inside `<AIProvider>` with a mounted `AIComposer` tree.

## `useAIStatus()`

```ts
const { status, isLoading, isStreaming } = useAIStatus()
```

Returns `'streaming'` while a run is active, otherwise `'ready'`.

## Message hooks

Message rendering and part overrides: [MESSAGES.md](./MESSAGES.md).

```ts
useAIMessageParts(messageId?: string)
useAIReasonings(messageId?: string)
useAITools(messageId?: string)
useAIResources(messageId?: string)
```

Omit `messageId` inside an `AIMessage*` component tree; pass `messageId` to read a specific message from elsewhere in the app.

| Hook | Returns | Scope |
|------|---------|-------|
| `useAIMessageParts` | `AIMessagePart[]` | All parts, normalized — **preferred** |
| `useAIReasonings` | `AIReasoningPart[]` | Reasoning parts only |
| `useAITools` | `AIToolPart[]` | Tool parts only |
| `useAIResources` | `AIResourcePart[]` | Resource parts from `data` payloads only |

**Caveat:** `useAIResources` does **not** include image or file upload parts. For every attachment type, use `useAIMessageParts` and filter `part.type === 'resource'`.

### Inside a custom part renderer

When overriding parts via `AIMessageParts` function children, prefer the second argument over hooks:

```ts
type AIMessagePartMeta = {
  index: number
  isStreaming: boolean
  placement: 'cot' | 'message'
  toolRegistration: AIToolRegistration | null
}
```

| Field | Description |
|-------|-------------|
| `index` | 0-based part position in the message |
| `isStreaming` | `true` while the part is actively updating |
| `placement` | `'cot'` inside the reasoning panel; `'message'` at message level |
| `toolRegistration` | Registry entry for registered tools; `null` otherwise |

```tsx
<AIMessageParts>
  {(part, meta) => {
    if (part.type === 'text' && meta.placement === 'message') {
      return <MyText text={part.text} streaming={meta.isStreaming} />
    }
    return null
  }}
</AIMessageParts>
```

Returning `null` falls through to the built-in renderer. See hybrid overrides in [MESSAGES.md](./MESSAGES.md#hybrid-override-hitl-or-single-tool).

### Reading a message by id

```tsx
function ToolSummary({ messageId }: { messageId: string }) {
  const tools = useAITools(messageId)
  return <span>{tools.length} tool calls</span>
}
```

### Filter resources from the full model

```tsx
function MessageAttachments({ messageId }: { messageId: string }) {
  const parts = useAIMessageParts(messageId)
  const resources = parts.filter((p) => p.type === 'resource')

  return (
    <ul>
      {resources.map((r) => (
        <li key={r.uri}>{r.name}</li>
      ))}
    </ul>
  )
}
```
