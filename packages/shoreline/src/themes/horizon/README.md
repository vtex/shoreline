# Horizon theme

Horizon is the Shoreline theme for the new VTEX admin interfaces (AI Workspace,
Studio and Design templates), proposed by the
[RFC: Shoreline Horizon](https://docs.google.com/document/d/1AAEpiZ9fc1is2leFOehiiErGc30aSyTTGyEBORPoouI).
Sunrise stays the default theme. Horizon is **experimental** while its component
coverage is reviewed with Design.

```tsx
import '@vtex/shoreline/themes/horizon'
import { Button } from '@vtex/shoreline'
```

Select one complete theme per document. Tokens are declared on `:root` and
component selectors are global, so loading two themes makes the result depend on
the cascade (the later one wins); it does not scope a subtree. The split entries
(`/tokens`, `/reset`, `/base`, `/components`, each with an `/unlayered` variant)
need `@layer sl-reset, sl-base, sl-tokens, sl-components;` declared first, or
the unlayered variants used consistently.

## What changes compared to Sunrise

`tokens.css` is a complete, standalone token set that declares every Sunrise
token in the same order, so `diff ../sunrise/tokens.css tokens.css` shows the
theme delta. The values below come from the AI Workspace design reference
(`vtex/admin-platform` `ai-workspace/shell/app/theme.css`, commit `2059b3ae6`,
identical to `vtex/aiw-styleguide@baceafac`). Everything else keeps the Sunrise
value.

| Group | Horizon | Notes |
| --- | --- | --- |
| Gray scale (`--sl-color-gray-0…13`) | cool-tinted: `#f5f8fc` → `#0a1524` → `#040e1b` | affects every semantic token that references gray steps |
| Blue scale (`--sl-color-blue-9…13`) | `#0a72ee`, `#1e4ee5`, `#0131c5`, `#042db4`, `#002499` | steps 1–8 unchanged; accent foreground/background follow |
| Muted backgrounds (`--sl-bg-muted*`, `--sl-bg-muted-plain*`) | `color-mix()` of gray-11 (`#0a1524`) at 5/10/15 % | same computed colors as the reference `rgba(10, 21, 36, …)` literals |
| Muted foregrounds (`--sl-fg-muted*`) | gray-10 / gray-11 / gray-12 | one step lighter than Sunrise |
| `--sl-fg-base-soft`, `--sl-fg-base-disabled` | gray-8, gray-5 | |
| Radius (`--sl-radius-1…3`) | `0.5rem`, `0.75rem`, `1rem` | |
| Shadows (`--sl-shadow-1…2`) | `0 1px 2px 0 rgb(0 0 0 / 0.05)`, `0 1px 3px 0 rgb(0 0 0 / 0.08)` | much subtler than Sunrise; px keeps shadows independent of the root font size |

### Tokens added by Horizon

These six names exist only in Horizon today. Declaring them in Sunrise is an
ordinary token decision with its own review.

| Token | Value | Purpose |
| --- | --- | --- |
| `--sl-radius-4` | `1.5rem` | large cards, panels and docks |
| `--sl-font-weight-bold` | `700` | emphasis stronger than semibold |
| `--sl-shadow-3` | `0 2px 6px 0 rgb(0 0 0 / 0.08)` | raised surfaces |
| `--sl-shadow-4` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | floating surfaces (menus, popovers) |
| `--sl-shadow-5` | `0 2px 8px 0 rgb(0 0 0 / 0.15)` | strongest surface shadow |
| `--sl-overlay-bg` | `rgba(0, 0, 0, 0.6)` | modal and drawer backdrops |

### Component overrides

Horizon carries the AI Workspace adjustments to existing Shoreline components.
They live in `components/<name>.css`, registered after the shared Sunrise
import in `components/index.css`, so the Sunrise rules remain the fallback and
the override wins inside the `sl-components` layer. In the application these
rules were unlayered and beat every Shoreline state rule, so each override pins
the states it needs (hover, focus, visited) instead of relying on order alone.

| Component | Horizon | Source in AI Workspace |
| --- | --- | --- |
| Link | inherits the surrounding color, emphasis font, underline only on hover; focus ring kept | `app/globals.css` |
| Tab | no list border; the selected tab is a soft pill (`--sl-bg-base-soft` / `--sl-fg-base-soft`) without the accent underline, also on hover and focus | `app/globals.css` |
| Content | centered with a `85rem` maximum width outside Page content and headers | `app/globals.css` |
| Page | full width inside flex shells | `app/globals.css` |
| Search | placeholder in `--sl-color-gray-6`; hidden on focus as in Sunrise | `app/globals.css` |
| Tag | inline-flex with a gap for icons, pill radius by default | `components/shoreline/tag/tag.css` (wrapper default `shape="rounded"`) |

Pending with their component PRs, because Shoreline does not render these
attributes or variants yet: Button `shape`/`tone`, IconButton `shape`, Tag
`shape`/`outline`/`transparent`, TagIcon and TagDismiss.

Not ported, because they are not overrides of Shoreline components: app
components that reuse `data-sl-*` names (`components/skeleton`,
`components/ui/empty-state`), rules scoped to app features (composer textarea,
search-modal backdrop, backoffice filter popover, initiatives detail row), the
sidebar, `[data-dialog-dismiss]` (no Shoreline element carries it),
`[hidden][hidden]` and the `data-sl-full-*` utilities.

### Deliberately not included

- Sidebar, composer and canvas tokens (`--sl-sidebar-*`, `--sl-composer-*`,
  `--sl-z-canvas-panel`): they belong to components Shoreline does not have yet.
- Product stacking overrides (`--sl-z-4/5/6`), semantic z-index aliases, a brand
  color token, status color redeclarations, the `--sl-bg-strong-disabled` alias
  and the `[data-sl-table-cell]` override from the AI Workspace stylesheet.
- Typography changes (15px body, page-title/metric roles) and component API
  changes (Button `shape`, `small`, `success`, `outline`): follow-up specs.

For design review: with the cool gray scale, `--sl-fg-base-disabled` (gray-5,
`#b7c3d2`) on white is about 1.9:1 and `--sl-fg-base-soft` (gray-8, `#506077`)
about 5.9:1. These are the reference values; adjust the semantic token, not the
scale, if a different contrast is wanted.

## Structure

```text
horizon/
├── tokens.css              # complete standalone token set
├── reset.css               # @import "../../foundations/reset.css"
├── base.css                # @import "../../foundations/base.css"
├── components/
│   ├── index.css           # shared Sunrise styles first, then the overrides
│   └── <name>.css          # one override file per component
├── styles.css              # complete entry, layered
└── styles-unlayered.css    # complete entry, unlayered
```

Reset and base come from the theme-neutral [`src/foundations`](../../foundations/README.md).
Component stylesheets are shared with Sunrise by import; they consume tokens
only, so Horizon changes their look through `tokens.css`. The build
(`src/scripts/build-css.ts`) reads the theme list from
[`src/themes/themes.ts`](../themes.ts) and emits the ten public entries into
`dist/themes/horizon/`.

## Evolving the theme

- **Change a value**: edit `tokens.css`. Keep the Sunrise order.
- **Add a token**: declare it in every theme, or add it to `expectedAdditions`
  in [`tests/theme-contract.test.ts`](../tests/theme-contract.test.ts) when it is
  Horizon-only. The test fails until the decision is explicit.
- **Override a component**: add `components/<name>.css` and register it after
  the shared import in `components/index.css`. Keep the rules token-driven and
  without `@layer` (the build owns the layer), and pin the states the override
  must hold against the shared rules. The contract test checks registration,
  token references and the absence of literal colors.
- **Verify**: `pnpm --filter @vtex/shoreline build:css`, then
  `pnpm vitest run packages/shoreline/src/themes`, then compare the themes in
  Storybook through the toolbar theme switcher.
