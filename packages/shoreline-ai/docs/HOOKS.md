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
| `isOpeningThread` | `true` while `threads.load` of [`<AIProvider>`](./PROVIDER.md#threads-adapter) is loading the thread |
| `error` | `AIThreadError \| null`. `{ type: 'thread_open', message }` when `threads.load` rejects. It does not report run errors: use [`useAIStatus`](#useaistatus) |
| `sendMessage` | Append user message and start a run |
| `stopGeneration` | Cancel active run (`abortSignal`) |
| `switchThread` | Cancels the active run, clears the thread, updates the thread id and loads it with `threads.load` |
| `createThread` | Cancels the active run, clears the thread, sets a new id and returns it |
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

With a `threads.load` method, switching is one call. A controlled provider loads the history when the `threadId` prop changes. An uncontrolled provider loads it when you call `switchThread`:

```tsx
// <AIProvider threads={threads}>, with or without threadId
const { switchThread, isOpeningThread, error } = useAIThread()

switchThread(newId)
```

Without `threads.load`, load the history yourself:

```ts
switchThread(newId)
// fetch AIMessage[] for newId from your API
loadMessages(history)
```

`switchThread` cancels the active run (runs do not continue in the background), clears the thread and updates `threadId`. When the provider has a `threads.load`, it fetches the thread and fills it for you, so you do not call `loadMessages`. If you switch again before the load ends, the late result is ignored. `createThread` never calls `threads.load`, and the first conversation id that your transport gets from the server does not either. Without `threads.load`, fetch the history yourself and call `loadMessages`.

## `useAIComposer()`

```ts
const { text, disabled, attachments, setText, send, reset } = useAIComposer()
```

| Member | Description |
|--------|-------------|
| `text` | Current draft in the composer |
| `disabled` | `true` when send is not allowed (`!canSend`) |
| `attachments` | The files in the composer, as `readonly AIAttachment[]` |
| `setText` | Updates draft text |
| `send` | Sends the draft, same as the send button |
| `reset` | Clears draft text and attachments |

Use inside `<AIProvider>` with a mounted `AIComposer` tree.

Each attachment is an `AIAttachment`:

```ts
interface AIAttachment {
  id: string
  name: string
  type: 'image' | 'document' | 'file'
  contentType?: string
  status: 'uploading' | 'ready' | 'error'
  progress?: number // 0 to 1, set while uploading
  error?: string // set when status is 'error'
  file?: File // can be missing, check it before you use it
}
```

```tsx
const { attachments } = useAIComposer()
const hasError = attachments.some((item) => item.status === 'error')
```

A file in the `error` state does not block sending: the message goes out without it, see [COMPOSER.md](./COMPOSER.md#attachments).

## `useAIStatus()`

```ts
const { status, isLoading, isStreaming, error } = useAIStatus()
```

`status` is one of:

| Status | When |
|---|---|
| `idle` | No messages and no run |
| `submitted` | A run is active and the assistant has sent no content yet |
| `streaming` | A run is active and the assistant has sent content |
| `error` | The last run failed and nothing is running |
| `ready` | Otherwise |

| Field | Value |
|---|---|
| `isLoading` | `true` for `submitted` and `streaming` |
| `isStreaming` | `true` for `streaming` |
| `error` | `{ type: 'run', message }` after a failed run, `null` otherwise |

`error` is cleared when the next message is sent (a new run starts) or the thread changes. A run that the user cancels is not an error. `status` becomes `'error'` only from a run that failed in this session: messages loaded from history are treated as complete. A run fails when the transport throws or returns a final snapshot with `status: 'error'`, see [RUNTIME.md](./RUNTIME.md#failure).

```tsx
function RunStatus() {
  const { status, isLoading, error } = useAIStatus()

  if (error) return <p role="alert">{error.message}</p>

  return <span>{isLoading ? 'Working...' : status}</span>
}
```

## `useAIThreadList()`

```ts
const { threads, isLoading, error, refresh, archiveThread } = useAIThreadList()
```

Reads the thread list of the nearest [`<AIProvider>`](./PROVIDER.md) from its `threads` adapter. Without an adapter or without `threads.list`, `threads` is `[]`, `isLoading` is `false`, `error` is `null` and `refresh` does nothing.

| Member | Description |
|--------|-------------|
| `threads` | `AIThreadData[]`. Archived threads stay in the list with `archived: true`: filter them if you want to hide them |
| `isLoading` | `true` while the list loads |
| `error` | `AIThreadError \| null`. `{ type: 'thread_list', message }` when `list` rejects. `{ type: 'thread_archive', message }` when an archive fails |
| `refresh` | Loads the list again. Calls made while a load is running share the same request |
| `archiveThread` | Archives a thread by id |

- The list loads once when the provider mounts. Call `refresh` to load it again, for example after you create a thread.
- `archiveThread(id)` is optimistic: the thread shows `archived: true` at once. If `archive` rejects, the thread goes back to its previous state, `error` is set and the promise rejects with the original error.
- If the adapter has no `archive` method, `archiveThread` rejects with a clear message and the list does not change. It also rejects for an id that is not in the list.
- Calling `archiveThread` again for the same id while it runs shares the same request.
- `refresh` clears a previous archive error (and any list error) when it starts.
- The list is not loaded again after an archive. Call `refresh` if you want the server state.
- Archiving the active thread does not switch the thread. Call `switchThread` or `createThread` yourself if you want to.

```tsx
function History() {
  const { threads, isLoading, error, archiveThread } = useAIThreadList()
  const { switchThread } = useAIThread()

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      {error ? <p role="alert">{error.message}</p> : null}
      <ul>
        {threads
          .filter((thread) => !thread.archived)
          .map((thread) => (
            <li key={thread.id}>
              <button type="button" onClick={() => switchThread(thread.id)}>
                {thread.title ?? thread.id}
              </button>
              <button
                type="button"
                onClick={() => archiveThread(thread.id).catch(() => {})}
              >
                Archive
              </button>
            </li>
          ))}
      </ul>
    </>
  )
}
```

The type of the returned value is exported as `AIThreadListState`.

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
| `useAIResources` | `AIResourcePart[]` | Resource parts only: files the user attached and resources your transport yields |

`useAIResources` returns the `resource` parts of the message, in message order. This includes the files the user attached to a user message (images too, with an `image/*` MIME type), which `useAIMessageParts` does not return, so filtering that hook is not the same thing.

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

### List the resources of a message

```tsx
function MessageAttachments({ messageId }: { messageId: string }) {
  const resources = useAIResources(messageId)

  return (
    <ul>
      {resources.map((r) => (
        <li key={r.uri}>{r.name}</li>
      ))}
    </ul>
  )
}
```
