# Hooks guide

> **Status:** experimental

Use inside `<AIProvider>`. Runtime setup: [RUNTIME.md](./RUNTIME.md). Provider props: [PROVIDER.md](./PROVIDER.md).

## `useAIThread()`

```ts
const {
  messages,
  threadId,
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
| `sendMessage` | Append user message and start a run |
| `stopGeneration` | Cancel active run (`abortSignal`) |
| `switchThread` | Cancel, clear UI, update thread id |
| `createThread` | New id, clear UI, set active |
| `loadMessages` | Replace thread content from `AIMessage[]` |

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

`switchThread` clears the Assistant-UI thread and updates `threadId`. Fetch and hydrate in your app layer.

## `useAIStatus()`

```ts
const { status, isLoading, isStreaming } = useAIStatus()
```

Returns `'streaming'` while a run is active, otherwise `'ready'`.

## Message hooks

```ts
useAIReasonings(messageId?: string)
useAITools(messageId?: string)
useAIResources(messageId?: string)
useAIMessageParts(messageId?: string)
```

Omit `messageId` inside a message component tree; pass `messageId` to read a specific message.
