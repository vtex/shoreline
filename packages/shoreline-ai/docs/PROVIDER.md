# Provider guide

> **Status:** experimental

`<AIProvider>` wraps your chat UI. It connects the runtime to the hooks and the components, and keeps the thread id, the open canvas and the run error. Create the runtime first, see [RUNTIME.md](./RUNTIME.md).

## `<AIProvider>`

```tsx
<AIProvider
  runtime={runtime}
  threadId={activeThreadId}
  onThreadChange={setActiveThreadId}
  threads={threads}
  onRunError={(error) => toast(error.message)}
>
  {children}
</AIProvider>
```

| Prop | Default | Purpose |
|------|---------|---------|
| `runtime` | required | From `useRuntime(built)` |
| `threadId` | `undefined` | Active thread id. Pass it to control the thread yourself |
| `onThreadChange` | `undefined` | Called when the active thread id changes |
| `threads` | `undefined` | Thread operations backed by your server, see [`threads`](#threads-adapter) |
| `onRunError` | `undefined` | Called once when a run fails, see [`onRunError`](#onrunerror) |
| `debugStream` | `false` | Records every run for the [debug panel](./DEBUG.md) |
| `debugMaxRuns` | `20` | Runs kept when `debugStream` is on |
| `debugMaxSteps` | `1000` | Steps kept per run when `debugStream` is on |

## `threads` adapter

Pass an `AIThreadAdapter` to connect the provider to your server:

```ts
interface AIThreadAdapter {
  list(): Promise<AIThreadData[]>
  load?(threadId: string): Promise<AIMessage[]>
  archive?(threadId: string): Promise<void>
}
```

| Method | Used for |
|--------|----------|
| `list` | Required. The threads shown by [`useAIThreadList`](./HOOKS.md#useaithreadlist) |
| `load` | Optional. Returns the saved messages when a thread opens |
| `archive` | Optional. Used by `archiveThread` of `useAIThreadList` |

```tsx
const threads = useMemo<AIThreadAdapter>(
  () => ({
    list: () => api.listThreads(),
    load: (threadId) => api.getMessages(threadId),
    archive: (threadId) => api.archiveThread(threadId),
  }),
  []
)

<AIProvider runtime={runtime} threadId={threadId} onThreadChange={setThreadId} threads={threads}>
  {children}
</AIProvider>
```

Rules:

- **Keep the adapter stable between renders** (for example with `useMemo` or a module constant). Create it once per provider.
- Provide only the methods your backend supports. When `archive` is missing, `archiveThread` rejects with a clear error. When `load` is missing, a thread opens empty.
- `load` replaces the old open callback. It runs when the thread id given in the `threadId` prop changes (see [Controlled and uncontrolled](#controlled-and-uncontrolled-thread-id)). The messages it returns replace the thread. While it runs, `useAIThread().isOpeningThread` is `true`. If it rejects, `useAIThread().error` is `{ type: 'thread_open', message }`.
- `list` loads once when the provider mounts, and again when you call `refresh` from `useAIThreadList`. An adapter that appears after the provider mounted is not loaded by itself: call `refresh`.

## `onRunError`

`onRunError(error)` is called once when a run fails, with `{ type: 'run', message }`. Use it for side effects such as a toast or a log. It is not called when the user cancels. If your callback throws, the error is ignored and the run is not affected. To show the error in the UI, read `useAIStatus().error` instead, see [HOOKS.md](./HOOKS.md#useaistatus).

## Controlled and uncontrolled thread id

- **Controlled:** pass `threadId`. You own the id. Update it in `onThreadChange`, which the provider calls when a hook asks for a change (`switchThread`, `createThread`). Changing the prop between two non-null ids clears the thread and calls `threads.load` for the new id. Changing the prop to `null` also clears the thread. Going from `null` to a first id does **not** clear the thread, so a run that already started keeps its messages.
- **Uncontrolled:** omit `threadId`. The provider keeps the id. `threads.load` is not called: fetch the messages yourself and call `loadMessages`, see [HOOKS.md](./HOOKS.md#multi-thread-flow).

## `useAIContext()`

```ts
const { runtime, threadId, canvas, openCanvas, closeCanvas } = useAIContext()
```

| Field | Purpose |
|-------|---------|
| `runtime` | The `AIRuntime` you passed. Opaque, do not call methods on it |
| `threadId` | Active thread id |
| `canvas` | Active canvas tool state |
| `openCanvas` / `closeCanvas` | Used by canvas-mode tool UIs |

The transport reads the thread id from `RuntimeRunInput.threadId`, which comes from the `.threadId()` getter of the builder, see [RUNTIME.md](./RUNTIME.md#thread-id). To change the thread, use [`useAIThread().switchThread`](./HOOKS.md#useaithread) and do not keep the id anywhere else.

## Nested and sibling providers

Each `<AIProvider>` is an independent instance. You can place two side by side or one inside the other.

```tsx
<AIProvider runtime={runtimeA}>
  <Chat />
</AIProvider>

<AIProvider runtime={runtimeB}>
  <Chat />
</AIProvider>
```

- A hook or a component reads the **nearest** provider above it. There is no inheritance: an inner provider cannot read the outer one.
- The thread id, the messages, the canvas, the run error, the thread list and the debug records are all per provider. A run in one provider does not change the status of another.
- Each provider needs its own runtime from its own `useRuntime` call. Do not share one runtime between two providers.
- **Shadowing pitfall:** inside an inner provider, `useAIThread`, `useAIStatus`, `useAIStreamDebug` and the rest always talk to the inner provider. Code that should talk to the outer one must be rendered outside the inner provider. This includes `debugStream`: the inner provider does not show the runs of the outer one, even when the outer one has it on.
- One provider has one active thread. It does not run several threads at once.

## Canvas

Place `<AICanvas />` in your layout for canvas-mode tools. See [TOOL-UI.md](./TOOL-UI.md).
