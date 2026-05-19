# Runtime guide

> **Status:** experimental

Build a **`StreamTransport`**, compose it with **`createRuntimeBuilder`**, mount with **`useRuntime`**, then wrap your app in [**`<AIProvider>`**](./PROVIDER.md).

## Concepts

| Concept | Role |
|---------|------|
| `AIMessage` / `AIMessagePart` | Public message model (text, reasoning, tool, resource) |
| `StreamTransport` | Your backend; yields `RuntimeSnapshot` |
| `AttachmentHandler` | Optional file upload plugin |
| `createRuntimeBuilder` | Composes plugins into `BuiltRuntime` |
| `useRuntime` | Mounts `BuiltRuntime` on Assistant-UI LocalRuntime |

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
  async *run({ trigger, abortSignal }) {
    const text = trigger.message.parts.find((p) => p.type === 'text')
    const userText = text?.type === 'text' ? text.text : ''

    yield {
      parts: [{ type: 'text', text: `Echo: ${userText}` }],
      status: 'streaming',
    }

    if (abortSignal.aborted) {
      return { parts: [], status: 'error' }
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
  .transport(myStreamTransport)
  .attachments(myAttachmentHandler) // optional
  .build()
```

`.build()` without `.transport()` throws.

## `StreamTransport`

```ts
interface StreamTransport {
  run(input: RuntimeRunInput): AsyncGenerator<RuntimeSnapshot, RuntimeSnapshot>
}

interface RuntimeRunTrigger {
  type: 'message'
  message: AIMessage // user message that started the run
}

interface RuntimeRunInput {
  messages: AIMessage[] // full thread at run time
  trigger: RuntimeRunTrigger
  abortSignal: AbortSignal
  runResponseId: string // assistant slot id for this run
}
```

| Field | Purpose |
|-------|---------|
| `messages` | Full history — use for context-aware backends |
| `trigger.message` | User turn that started the run (e.g. SSE `message_id`) |
| `runResponseId` | Assistant message slot id (debug / correlation) |
| `yield` / `return` | Partial vs final snapshot |

Backends that only need the latest user message should read `input.trigger.message`, not the full list.

## `useRuntime`

```ts
const runtime = useRuntime(built)
```

Returns `AIRuntime` for `<AIProvider runtime={runtime}>`. Do not call `useLocalRuntime` in app code.

Advanced: `runtime.thread.reset`, `runtime.cancelRun()` (prefer [`loadThreadMessages`](#hydrate-history) and hooks in [HOOKS.md](./HOOKS.md)).

## Hydrate history

```ts
import { loadThreadMessages } from '@vtex/shoreline-ai'

loadThreadMessages(runtime, historyMessages)
```

Or from a component: `useAIThread().loadMessages(history)` — see [HOOKS.md](./HOOKS.md).

**Multi-thread:** `switchThread(id)` → fetch history → `loadMessages(messages)`. See [PROVIDER.md](./PROVIDER.md).

## `AttachmentHandler`

```ts
interface AttachmentHandler {
  add(file: File): AsyncIterable<AttachmentUploadState>
  send(pending: PendingAttachment): Promise<AIResourcePart>
  remove(pending: PendingAttachment): Promise<void>
}
```

Register with `.attachments(handler)` on the builder.

## Stream debug

```tsx
<AIProvider runtime={runtime} debugStream>
```

```ts
const callbacks = useStreamDebugCallbacks(true)
// inside transport.run:
callbacks?.onRunStart({ runId, ... })
callbacks?.onEnvelope(runId, { ... })
callbacks?.onRunEnd(runId, finalParts)
```

Use `useAIStreamDebug()` in a debug panel.

## Runtime limitations

| Area | Notes |
|------|-------|
| `useAIStatus` | Does not map full `StreamStatus` yet |
| `useAIThreadList` | Not exported; use `AIThreadData` in your app |
| Transport `threadId` | Read from your closure/refs — not injected by Shoreline |
