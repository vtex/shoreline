# Stream debug guide

> **Status:** experimental

The stream debug panel shows what your transport sent during each run: one row per snapshot, what changed in it, and the final message. Use it while you build or fix a transport. Do not ship it to users.

It works with any transport. Your transport does not have to do anything for the panel to work.

## Turn it on

Pass `debugStream` to [`<AIProvider>`](./PROVIDER.md) and place `AIStreamDebugPanel` anywhere inside it:

```tsx
import {
  AIMessages,
  AIProvider,
  AIStreamDebugPanel,
  AIThread,
  AIThreadViewport,
  type AIRuntime,
} from '@vtex/shoreline-ai'

function Chat({ runtime }: { runtime: AIRuntime }) {
  return (
    <AIProvider runtime={runtime} debugStream>
      <AIThread>
        <AIThreadViewport>
          <AIMessages />
        </AIThreadViewport>
      </AIThread>
      <AIStreamDebugPanel />
    </AIProvider>
  )
}
```

| Prop of `<AIProvider>` | Default | Purpose |
|------------------------|---------|---------|
| `debugStream` | `false` | Records every run |
| `debugMaxRuns` | `20` | Runs kept. The oldest are dropped first |
| `debugMaxSteps` | `1000` | Steps kept per run. The oldest are dropped first |

When `debugStream` is off, nothing is recorded and the cost is zero. The panel then says that debug is off.

## What is a run, a step and a change

- A **run** starts when the user sends a message and ends when the transport returns, fails or is cancelled. A run has an id (the id of the assistant message), the thread id, the id of the user message, the start and end times, its status and, if it failed, an error message.
- A **step** is one snapshot the transport yielded, or its final snapshot. Every snapshot is a step, even one that repeats the previous parts, so you see everything the transport sent.
- A **change** is a part that is new or different from the previous step. For a text or reasoning part that grew, the change holds the text that was added (`delta`). A step stores its changes, not the whole snapshot.

## Read the panel

1. Pick a run in the **Run** list. The newest run is first.
2. The details show the status, the ids, the times and the error message.
3. **Steps** lists the snapshots in the order they arrived. Each row shows its number, time, status and a summary such as `text updated` or `no changes`. Open a row to see the changes of that step and the `debug` data your transport attached.
4. **Final parts** lists the parts of the final message in the order of the stream. If the transport sent reasoning first and then text, the reasoning comes first here.
5. **Clear** removes every recorded run.

## Attach your own data

Add `debug` to a snapshot to see your raw payload next to its step. The package never reads it: the panel only prints it as JSON.

```ts
const transport: StreamTransport = {
  async *run({ trigger }) {
    let parts: AIMessagePart[] = []

    for await (const event of callBackend(trigger.message)) {
      parts = event.parts
      yield { parts, status: 'streaming', debug: event.raw }
    }

    return { parts, status: 'ready' }
  },
}
```

## Good to know

- **Do not change a snapshot after you yield it.** The recorder keeps what you yielded, so changing it later changes what the panel shows.
- **Do not turn `debugStream` on or off while the app runs.** Changing it remounts the provider: the thread id kept by the provider (when you do not pass `threadId`), the open canvas and the run error are reset and the thread list loads again. Decide it when the app starts, for example from an environment flag.
- Records stay in memory and are lost on reload. An error in the recorder never breaks a run.
- Each provider records its own runs. A nested provider does not show the runs of its parent, see [PROVIDER.md](./PROVIDER.md#nested-and-sibling-providers).

## Build your own view

`useAIStreamDebug()` returns the records of the nearest provider:

```ts
const { enabled, runs, clear } = useAIStreamDebug()
```

| Field | Description |
|-------|-------------|
| `enabled` | `true` when the nearest provider has `debugStream` on |
| `runs` | `AIStreamDebugRun[]`, newest first. Empty when debug is off |
| `clear` | Removes every run |

```ts
interface AIStreamDebugRun {
  runId: string
  threadId: string | null
  userMessageId: string
  startedAt: string // ISO date
  endedAt?: string // not set while the run goes on
  status: StreamStatus
  error?: string
  steps: AIStreamDebugStep[]
  finalParts: AIMessagePart[] // empty while the run goes on
}

interface AIStreamDebugStep {
  index: number // starts at 1
  at: string // ISO date
  status: StreamStatus | undefined
  changes: AIStreamDebugChange[]
  debug?: unknown
}

interface AIStreamDebugChange {
  partIndex: number
  type: AIMessagePart['type']
  kind: 'added' | 'updated'
  delta?: string
}
```

`AIStreamDebugRunView` shows a single run: its details, the steps and the final parts. `AIStreamDebugPanel` uses it for the selected run. Use it alone when you want your own run picker:

```tsx
import { AIStreamDebugRunView, useAIStreamDebug } from '@vtex/shoreline-ai'

function LastRun() {
  const { enabled, runs } = useAIStreamDebug()

  if (!enabled) return <p>Debug is off.</p>

  const [last] = runs

  return last ? <AIStreamDebugRunView run={last} /> : <p>No runs yet.</p>
}
```

| Component | Props |
|-----------|-------|
| `AIStreamDebugPanel` | `title` (default `'Stream debug'`) and `section` attributes |
| `AIStreamDebugRunView` | `run` (an item of `runs`) and `div` attributes |

Both use the styles from `@vtex/shoreline-ai/css` and the attributes `data-sl-ai-stream-debug*`.
