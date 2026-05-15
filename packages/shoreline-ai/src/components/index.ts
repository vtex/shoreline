/**
 * Component barrel for `@vtex/shoreline-ai`.
 *
 * Each component group exports through its own `./<group>` re-export below.
 * Sibling components MUST go through this barrel; deep cross-component imports
 * are forbidden by ESLint (Constitution Principle I, FR-064 — see `.eslintrc.cjs`).
 *
 * The `PLOP_INJECT_EXPORT` marker is consumed by the root `plopfile.js`
 * `component` generator when invoked with `--package shoreline-ai`
 * (e.g. `pnpm gen:component AIThing --package shoreline-ai`). Do not remove.
 */

/* PLOP_INJECT_EXPORT */
