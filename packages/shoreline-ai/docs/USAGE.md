# Usage

> **Status:** experimental

A chat with a thread list, built from the parts in the other guides. Read [RUNTIME.md](./RUNTIME.md) first if you have not written a transport yet.

## Quick start

```tsx
import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { useMemo, useRef, useState } from 'react'
import { LocaleProvider } from '@vtex/shoreline'
import {
  AIComposer,
  AIComposerAction,
  AIComposerActions,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
  AIMessages,
  AIProvider,
  AIThread,
  AIThreadEmpty,
  AIThreadViewport,
  AIThreadViewportFooter,
  createRuntimeBuilder,
  useAIStatus,
  useAIThread,
  useAIThreadList,
  useRuntime,
  type AIThreadAdapter,
  type StreamTransport,
} from '@vtex/shoreline-ai'

const transport: StreamTransport = {
  async *run({ trigger, threadId }) {
    // call your backend with threadId and trigger.message
    yield { parts: [{ type: 'text', text: 'Hello' }], status: 'streaming' }

    return { parts: [{ type: 'text', text: 'Hello!' }], status: 'ready' }
  },
}

export function ChatApp() {
  const [threadId, setThreadId] = useState<string | null>(null)
  const threadIdRef = useRef(threadId)
  threadIdRef.current = threadId

  const built = useMemo(
    () =>
      createRuntimeBuilder()
        .threadId(() => threadIdRef.current)
        .transport(transport)
        .build(),
    []
  )
  const runtime = useRuntime(built)

  const threads = useMemo<AIThreadAdapter>(
    () => ({
      list: async () => [],
      load: async () => [],
      archive: async () => {},
    }),
    []
  )

  return (
    <LocaleProvider locale="en-US">
      <AIProvider
        runtime={runtime}
        threadId={threadId}
        onThreadChange={setThreadId}
        threads={threads}
        onRunError={(error) => console.error(error.message)}
      >
        <History />
        <AIThread>
          <AIThreadViewport>
            <AIThreadEmpty>Ask me anything</AIThreadEmpty>
            <AIMessages />
            <AIThreadViewportFooter>
              <Composer />
            </AIThreadViewportFooter>
          </AIThreadViewport>
        </AIThread>
      </AIProvider>
    </LocaleProvider>
  )
}

function History() {
  const { threads } = useAIThreadList()
  const { createThread, switchThread } = useAIThread()

  return (
    <nav>
      <button type="button" onClick={() => createThread()}>
        New chat
      </button>
      {threads.map((thread) => (
        <button
          key={thread.id}
          type="button"
          onClick={() => switchThread(thread.id)}
        >
          {thread.title ?? thread.id}
        </button>
      ))}
    </nav>
  )
}

function Composer() {
  const { error } = useAIStatus()

  return (
    <>
      {error ? <p role="alert">{error.message}</p> : null}
      <AIComposer>
        <AIComposerField>
          <AIComposerInput />
          <AIComposerFooter>
            <AIComposerActions>
              <AIComposerAction />
            </AIComposerActions>
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </>
  )
}
```

What happens:

- `createThread` and `switchThread` cancel the active run, clear the thread and call `onThreadChange`. Because `threadId` is controlled and the adapter has `load`, the provider loads the saved messages of the new id.
- `createThread` makes a new id that your server may not know yet, so `load` should return `[]` for an id it does not find.
- The transport receives `threadId` from the getter in `.threadId()`.
- If a run fails, `useAIStatus().error` has the message and `onRunError` is called once.

## Next steps

- Show tool calls with your own components: [TOOL-UI.md](./TOOL-UI.md).
- Let users attach files: [RUNTIME.md](./RUNTIME.md#attachmenthandler) and [COMPOSER.md](./COMPOSER.md#attachments).
- See what your transport sends: [DEBUG.md](./DEBUG.md).
