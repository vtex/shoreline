# Runtime guide

> **Status:** experimental

Write a **`StreamTransport`** for your backend, join it with **`createRuntimeBuilder`**, create the runtime with **`useRuntime`**, then wrap your app in [**`<AIProvider>`**](./PROVIDER.md).

## Concepts

| Concept | Role |
|---------|------|
| `AIMessage` / `AIMessagePart` | The message model: text, reasoning, tool and resource parts |
| `StreamTransport` | Your backend. It yields snapshots of the assistant message |
| `AttachmentHandler` | Optional. Uploads the files the user adds in the composer |
| `createRuntimeBuilder` | Joins the transport, the handler and the thread id getter |
| `useRuntime` | Creates the runtime to pass to `<AIProvider>` |
| `AIRuntime` | What `useRuntime` returns. Opaque: you only pass it to `<AIProvider>` |

## Quick start

```tsx
import { useMemo } from 'react'
import {
  AIProvider,
  createRuntimeBuilder,
  useRuntime,
  type StreamTransport,
} from '@vtex/shoreline-ai'

const echoTransport: StreamTransport = {
  async *run({ trigger }) {
    const text = trigger.message.parts.find((part) => part.type === 'text')
    const userText = text?.type === 'text' ? text.text : ''

    yield {
      parts: [{ type: 'text', text: `Echo: ${userText}` }],
      status: 'streaming',
    }

    return {
      parts: [{ type: 'text', text: `Echo: ${userText}` }],
      status: 'ready',
    }
  },
}

function ChatRoot({ children }: { children: React.ReactNode }) {
  const built = useMemo(
    () => createRuntimeBuilder().transport(echoTransport).build(),
    []
  )
  const runtime = useRuntime(built)

  return <AIProvider runtime={runtime}>{children}</AIProvider>
}
```

## `createRuntimeBuilder()`

```ts
const built = createRuntimeBuilder()
  .threadId(() => activeThreadId) // optional
  .transport(myStreamTransport)
  .attachments(myAttachmentHandler) // optional
  .build()
```

| Method | Purpose |
|--------|---------|
| `.transport(transport)` | Sets your backend. Required: `.build()` throws without it |
| `.threadId(getThreadId)` | Sets a getter for the active thread id. See [Thread id](#thread-id) |
| `.attachments(handler)` | Turns on file uploads in the composer. See [`AttachmentHandler`](#attachmenthandler) |
| `.build()` | Returns the value to pass to `useRuntime` |

Keep `built` stable between renders (for example with `useMemo`), so the runtime is not created again on every render.

## `StreamTransport`

```ts
interface StreamTransport {
  run(input: RuntimeRunInput): AsyncGenerator<RuntimeSnapshot, RuntimeSnapshot>
}

interface RuntimeRunTrigger {
  type: 'message'
  message: AIMessage // the user message that started the run
}

interface RuntimeRunInput {
  messages: AIMessage[] // the whole thread, including the user message
  trigger: RuntimeRunTrigger
  abortSignal: AbortSignal
  runResponseId: string // id of the assistant message this run creates
  threadId?: string | null // from the builder getter, see "Thread id"
}

interface RuntimeSnapshot {
  parts: AIMessagePart[] // all parts of the assistant message so far
  status?: StreamStatus
  errorMessage?: string
  debug?: unknown
}
```

| Field | Purpose |
|-------|---------|
| `messages` | Full history, for backends that need context |
| `trigger.message` | The user turn that started the run. Backends that only need the latest message read this |
| `abortSignal` | Aborts when the user cancels or switches thread. Stop your request on it |
| `runResponseId` | Id of the assistant message, useful to match logs with the UI |
| `threadId` | The thread id, see below |
| `yield` | A partial snapshot while the answer grows |
| `return` | The final snapshot when the answer ends |

Every snapshot holds **all** parts of the assistant message so far, not only the new ones. Do not change a snapshot after you yield it.

### Snapshot fields

| Field | Purpose |
|-------|---------|
| `parts` | The parts of the assistant message |
| `status` | `'streaming'` while the answer grows, `'ready'` when it ends. Return `'error'` in the final snapshot to fail the run |
| `errorMessage` | Text for a failed run. When the final snapshot has `status: 'error'` and no parts, the message shows this text. It is also the `message` of the run error |
| `debug` | Anything you want to see in the [stream debug panel](./DEBUG.md). The package stores it and never reads it |

### Thread id

The transport receives the thread id as `input.threadId`. Its value is what the getter of `.threadId()` returns at the start of the run. Without `.threadId()`, `input.threadId` is `null`. Use the id to tell your backend which conversation the run belongs to.

```ts
const built = createRuntimeBuilder()
  .threadId(() => threadIdRef.current)
  .transport({
    async *run({ threadId, trigger }) {
      // call your backend with threadId and trigger.message
      return { parts: [], status: 'ready' }
    },
  })
  .build()
```

### Failure

If the transport throws, the run does not throw to your app. Instead:

- the user message stays in the thread;
- the assistant message ends as incomplete, with the error message as its text;
- `useAIStatus().status` is `'error'`;
- `useAIStatus().error` is `{ type: 'run', message }`;
- `onRunError` of [`<AIProvider>`](./PROVIDER.md) is called once.

Returning a final snapshot with `status: 'error'` has the same result, with one difference: if that snapshot has parts, the message keeps those parts. Without parts it shows `errorMessage`. When the transport gives no `errorMessage`, the message of the run error is `The run failed`. The error is cleared when the next message is sent or the thread changes. The app decides how to show it: read `useAIStatus().error` or use `onRunError` for a toast or a log. To try again, call `sendMessage` again.

### Cancel

When the user stops a run (`stopGeneration`, the stop button) or switches thread, `abortSignal` aborts. The package stops pulling snapshots from your generator at once, even if your code ignores the signal, and closes it. Cancel is not an error: `status` does not become `'error'` and `onRunError` is not called.

## `useRuntime`

```ts
const runtime = useRuntime(built)
```

Returns an `AIRuntime` for `<AIProvider runtime={runtime}>`. `AIRuntime` is opaque: its contents are not part of the public API. Thread operations (switch, create, load, stop) are available only through the hooks in [HOOKS.md](./HOOKS.md).

## Hydrate history

```ts
import { loadThreadMessages } from '@vtex/shoreline-ai'

loadThreadMessages(runtime, historyMessages)
```

Or from a component: `useAIThread().loadMessages(history)`, see [HOOKS.md](./HOOKS.md). With the `threads` adapter of [`<AIProvider>`](./PROVIDER.md), `threads.load` hydrates the thread for you when it opens.

## `AttachmentHandler`

```ts
interface AttachmentHandler {
  accept?: string // for example 'image/*,.pdf'. Default '*'
  maxSize?: number // bytes
  maxCount?: number // files in the composer at once
  add(file: File): AsyncIterable<AttachmentUploadState>
  send(pending: PendingAttachment): Promise<AIResourcePart>
  remove(pending: PendingAttachment): Promise<void>
}

interface AttachmentUploadState {
  progress: number // 0 to 1
  status: 'uploading' | 'ready' | 'error'
  error?: string // message for the chip when status is 'error'
}
```

Register it with `.attachments(handler)` on the builder.

```ts
const handler: AttachmentHandler = {
  accept: 'image/*,.pdf',
  maxSize: 5 * 1024 * 1024,
  maxCount: 3,
  async *add(file) {
    yield { progress: 0.5, status: 'uploading' }
    // upload the file here
    yield { progress: 1, status: 'ready' }
  },
  async send(pending) {
    return {
      type: 'resource',
      uri: await uploadFile(pending.file),
      name: pending.name,
      mimeType: pending.contentType,
      size: pending.file.size,
    }
  },
  async remove() {
    // delete the uploaded file
  },
}
```

How it works:

1. **`add`** runs when the user picks a file. Yield `uploading` states with a `progress` from 0 to 1, then `ready`. The composer shows the progress on the chip. To fail, yield `{ status: 'error', progress: 0, error: 'message' }`: do not throw. If `add` throws, the chip also shows an error.
2. **`accept`, `maxSize`, `maxCount`** are checked before `add` runs. `accept` also sets the file types the picker offers. A file that is too large or beyond `maxCount` shows an error chip and is not uploaded. A file whose type is not accepted shows a notice in the composer. See [COMPOSER.md](./COMPOSER.md#attachments).
3. **`send`** runs when the user sends the message. Return the resource of the uploaded file.
4. The sent file reaches your transport as a part with `type: 'resource'` in `trigger.message.parts` (and in `messages`), with `uri`, `name`, `mimeType` and `size`.
5. **`remove`** runs when the user removes a file that was added and not sent yet. Use it to delete the uploaded file.
6. The package releases its own state for the file (the preview and the pending entry) when the message is sent, when the file is removed and when the upload fails.

Resource parts of user messages stay in the history: they come back in `useAIThread().messages` and survive `loadThreadMessages`. A resource link in an assistant message (a `resource` part in a snapshot) shows as an image when `mimeType` starts with `image/` and as a file otherwise.

## Stream debug

To see every snapshot a transport sends, turn on `debugStream` in [`<AIProvider>`](./PROVIDER.md) and read [DEBUG.md](./DEBUG.md).

## Runtime limitations

| Area | Notes |
|------|-------|
| Background runs | Not supported. Switching thread cancels the active run |
| Threads per provider | One active thread per `<AIProvider>`. To show two threads at the same time, use two providers, see [PROVIDER.md](./PROVIDER.md#nested-and-sibling-providers) |
