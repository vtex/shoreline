# `@vtex/shoreline-ai`

Composable, accessible, backend-agnostic React component library for AI agent surfaces in the VTEX Admin.

## What it is

`@vtex/shoreline-ai` is the AI surface layer that complements the [Shoreline](../shoreline/) design system. It ships:

- **Components** — `AIProvider`, `AIThread*`, `AIMessage*`, `AIComposer*`, `AIThreadList*`, `AICanvas*`, `AIMarkdown`, etc.
- **Hooks** — `useAIThread`, `useAIThreadList`, `useAIMessage`, `useAIStatus`, `useAICanvas`.
- **Adapter contract** — every consumer plugs in an `AdapterContract` implementation (e.g. `createVTEXConversationsAdapter` from `@vtex/agentic-ui`).

## What it is NOT

- Not coupled to any specific backend or transport.
- Not coupled to Next.js or any router primitive.
- Not a wrapper around `@assistant-ui/react`'s public API — assistant-ui is an internal-only runtime engine, isolated behind `runtime/adapter-bridge.ts`. No assistant-ui type ever appears in the public surface.

## Status

**Experimental** (per-component `@status` JSDoc). Public surface is governed by [`shoreline-specs/specs/001-shoreline-ai/contracts/public-api.md`](../../../shoreline-specs/specs/001-shoreline-ai/contracts/public-api.md) and [`adapter.md`](../../../shoreline-specs/specs/001-shoreline-ai/contracts/adapter.md). Both are FINAL as of 2026-05-15.

## Architecture

```text
┌─────────────────────────────────────────────────────────┐
│  Consumer app (Raccoon, Next.js, ...)                   │
│  • createVTEXConversationsAdapter (@vtex/agentic-ui)    │
│  • <AIProvider adapter={…}> + AIThread + AIComposer ... │
└────────────────────┬────────────────────────────────────┘
                     │ AdapterContract (public)
┌────────────────────▼────────────────────────────────────┐
│  @vtex/shoreline-ai (this package)                      │
│  • Public components & hooks                            │
│  • runtime/adapter-bridge.ts ─┐                         │
└────────────────────────────────┼────────────────────────┘
                                 │ assistant-ui runtime API
                                 ▼
                  @assistant-ui/react (internal only)
```

## Quickstart

See [`shoreline-specs/specs/001-shoreline-ai/quickstart.md`](../../../shoreline-specs/specs/001-shoreline-ai/quickstart.md) for the canonical "hello-agent in ≤1h" walkthrough.

## Constraints

- ESM-only with named exports — no defaults (FR-055).
- `forwardRef` + `aria-*` forwarding on every public component.
- Variants toggled via `data-{prop}` attributes — never dynamic classNames.
- Tokens are the only source of style — `--sl-*` CSS custom properties from `@vtex/shoreline-css`.
- Sibling components MUST go through the package barrel; deep imports across components are forbidden (Constitution Principle I).
- `@assistant-ui/*` may only be imported from `runtime/adapter-bridge.ts`.

## License

ISC — same as the rest of the Shoreline monorepo.
