# Composer guide

> **Status:** experimental

Shoreline-styled chat composer built on Assistant-UI `ComposerPrimitive` and `ComposerRuntime`.

## Setup

```tsx
import '@vtex/shoreline/css'
import '@vtex/shoreline-ai/css'

import { LocaleProvider } from '@vtex/shoreline'
import {
  AIProvider,
  AIComposer,
  AIComposerField,
  AIComposerInput,
  AIComposerFooter,
  AIComposerAddAttachment,
  AIComposerActions,
  AIComposerAction,
} from '@vtex/shoreline-ai'
```

Mount inside `<AIProvider>` (see [PROVIDER.md](./PROVIDER.md)).

## Normative layout

```tsx
<LocaleProvider locale="pt-BR">
  <AIProvider runtime={runtime}>
    <AIComposer loading={isAppLoading}>
      <AIComposerField>
        <AIComposerAttachments />
        <AIComposerInput />
        <AIComposerFooter>
          <AIComposerAddAttachment />
          {/* App slots: agent pill, menus, etc. */}
          <AIComposerActions>
            <AIComposerAction />
          </AIComposerActions>
        </AIComposerFooter>
      </AIComposerField>
    </AIComposer>
  </AIProvider>
</LocaleProvider>
```

## Hooks

| Hook | Use for |
|------|---------|
| `useAIComposer()` | Draft text, attachments, `setText`, `send`, `reset` |
| `useAIThread()` | Thread history, `sendMessage` (bypasses draft), `switchThread` |
| `useAIStatus()` | Streaming state for cancel / `AIComposerAction` |

See [HOOKS.md](./HOOKS.md).

## Attachments

- Render pending files with `<AIComposerAttachments />` (or a custom `children` render prop on `ComposerPrimitive.Attachments`). Do not mount `<AIComposerAttachment />` outside that list.
- Each chip uses `AttachmentPrimitive.Root` and `AttachmentPrimitive.Remove` internally (via `AIComposerAttachment`).
- Removing a file updates composer state through the runtime adapter (`AttachmentHandler.remove`); there is no `onRemove` prop on the chip.

## Storybook

From the monorepo root:

```bash
pnpm dev:storybook
```

Stories live under **shoreline-ai / composer**. Use `ComposerStoryDecorator` from `stories/decorators.tsx` for:

- `LocaleProvider`
- `MockRuntimeProvider` from `src/test-utils/` (wraps `AIProvider` + mock stream transport and local attachments)

For Vitest or custom harnesses, import `MockRuntimeProvider`, `createMockStreamTransport`, and `createMockAttachmentHandler` from `src/test-utils/` (not exported in the package public API).

## Input DOM

`AIComposerInput` does not mount Shoreline `<Textarea />` (its controlled `onChange` and wrapper `div` break `ComposerPrimitive.Input`). It replicates the Textarea tree with data attributes only:

```html
<div data-sl-textarea>
  <textarea data-sl-textarea-input data-resizable="false" />
</div>
```

Styles come from `@vtex/shoreline-ai/css` selectors under `[data-sl-ai-composer-field]`.

## i18n

Built-in catalogs: `en-US`, `pt-BR`. Override on the root only:

```tsx
<AIComposer messages={{ send: 'Enviar' }} />
```
