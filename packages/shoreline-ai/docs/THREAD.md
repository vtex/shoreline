# Thread guide

> **Status:** experimental

Shoreline-styled chat **layout** for AI apps: the **`AIThread*`** family from `@vtex/shoreline-ai` (scrollable viewport, empty slot, sticky viewport footer, scroll-to-bottom). Message rendering stays on `ThreadPrimitive.Messages` from `@assistant-ui/react` in v0.

Related guides: [PROVIDER.md](./PROVIDER.md), [HOOKS.md](./HOOKS.md) (`useAIThread`, `isEmpty`), [COMPOSER.md](./COMPOSER.md) (mount `AIComposer` inside `AIThreadViewportFooter`).

**Prerequisites:** `<AIProvider runtime={runtime}>` wrapping your chat UI.

## Setup

```tsx
import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { ThreadPrimitive } from '@assistant-ui/react'
import {
  AIProvider,
  AIThread,
  AIThreadViewport,
  AIThreadEmpty,
  AIThreadScrollToBottom,
  AIThreadViewportFooter,
  AIComposer,
  useAIThread,
} from '@vtex/shoreline-ai'
```

## Normative composition

Inside `AIThreadViewport`, mount slots in this order (each slot except the footer is optional per route):

1. `AIThreadEmpty` (optional)
2. `ThreadPrimitive.Messages` (optional in v0 — app-owned)
3. `AIThreadViewportFooter` (required when the surface includes a composer)
   - `AIThreadScrollToBottom` (optional, **first child**)
   - `AIComposer` (+ banners de erro do app)

`ThreadPrimitive.Viewport` is the scroll container. `AIThreadViewportFooter` is `position: sticky` at the bottom of the viewport (same pattern as `@assistant-ui/react-ui` `Thread`). The scroll-to-bottom control floats above the composer via `position: absolute` on `[data-sl-ai-thread-scroll-to-bottom]` inside the sticky footer.

### Single-surface (empty + messages)

```tsx
const { isOpeningThread, error } = useAIThread()
const openError = error?.type === 'thread_open' ? error.message : null

<AIThread>
  <AIThreadViewport autoScroll>
    <AIThreadEmpty>{/* welcome */}</AIThreadEmpty>
    <ThreadPrimitive.Messages components={{ UserMessage, AssistantMessage }} />
    <AIThreadViewportFooter>
      <AIThreadScrollToBottom />
      {openError ? (
        <p role="alert" data-sl-ai-thread-error>
          {openError}
        </p>
      ) : null}
      <AIComposer loading={isOpeningThread}>{/* … */}</AIComposer>
    </AIThreadViewportFooter>
  </AIThreadViewport>
</AIThread>
```

### Home route (empty only)

Omit `ThreadPrimitive.Messages`; keep `AIThreadEmpty` + footer composer.

### Thread route (messages only)

Omit `AIThreadEmpty`; keep `ThreadPrimitive.Messages` + footer composer.

## Components

| Component | Purpose |
|-----------|---------|
| `AIThread` | Root container |
| `AIThreadViewport` | `ThreadPrimitive.Viewport` + auto-scroll (scroll container) |
| `AIThreadEmpty` | Welcome when `thread.isEmpty` and not `isOpeningThread` |
| `AIThreadViewportFooter` | Sticky footer; measures height for scroll inset |
| `AIThreadScrollToBottom` | Jump to latest (`ThreadPrimitive.ScrollToBottom`) |

## Opening a thread

While `useAIThread().isOpeningThread` is `true`:

- `AIThreadEmpty` does not render (avoids welcome flash before history hydrates).
- Use `AIComposer loading={isOpeningThread}` in the footer for input skeleton (see [COMPOSER.md](./COMPOSER.md)).

## `useAIThread().isEmpty`

```tsx
const { isEmpty, messages } = useAIThread()
```

`isEmpty` is `true` when the active thread has zero messages (same as `useAuiState((s) => s.thread.isEmpty)` when the thread source is active).

## Viewport props

`AIThreadViewport` forwards these to `ThreadPrimitive.Viewport` (defaults `true`):

- `autoScroll`
- `scrollToBottomOnRunStart`
- `scrollToBottomOnInitialize`
- `scrollToBottomOnThreadSwitch`

## Styling hooks

| Attribute | Region |
|-----------|--------|
| `[data-sl-ai-thread]` | Root |
| `[data-sl-ai-thread-viewport]` | Scrollable viewport (`ThreadPrimitive.Viewport`) |
| `[data-sl-ai-thread-empty]` | Empty slot |
| `[data-sl-ai-thread-viewport-footer]` | Sticky footer (composer, scroll control anchor) |
| `[data-sl-ai-thread-scroll-to-bottom]` | Scroll control (floated above footer) |
| `[data-sl-ai-thread-error]` | App error banner in footer |

## i18n

Pass `messages` on `AIThread` to override `scrollToBottom` (see package locale files under `components/thread/messages/`).
