# @vtex/shoreline-ai documentation

> **Status:** experimental

React components and hooks for AI chat. You bring a backend as a stream transport; the package renders the thread, the messages and the composer.

| Guide | Description |
|-------|-------------|
| [**USAGE.md**](./USAGE.md) | Quick start: a working chat in a few steps |
| [**RUNTIME.md**](./RUNTIME.md) | `StreamTransport`, builder, `useRuntime`, failure and cancel, attachments, hydrate |
| [**PROVIDER.md**](./PROVIDER.md) | `<AIProvider>`, `threads` adapter, `onRunError`, thread id, nested providers, canvas |
| [**HOOKS.md**](./HOOKS.md) | `useAIThread`, `useAIThreadList`, `useAIStatus`, `useAIComposer`, `useAIAttachment`, message part hooks |
| [**COMPOSER.md**](./COMPOSER.md) | `AIComposer*`, layout, attachment chips and errors, i18n |
| [**THREAD.md**](./THREAD.md) | `AIThread*`, viewport, empty slot, footer, scroll-to-bottom |
| [**MESSAGES.md**](./MESSAGES.md) | `AIMessages*`, reasoning groups, part overrides, resources |
| [**TOOL-UI.md**](./TOOL-UI.md) | `makeAIToolUI`, `<AICanvas>`, fallback |
| [**DEBUG.md**](./DEBUG.md) | Stream debug panel: see every snapshot your transport sends |

Package entry: [`../src/index.ts`](../src/index.ts).
