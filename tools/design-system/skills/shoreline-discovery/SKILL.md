---
name: shoreline-discovery
description: Inventory Shoreline and scope a native component, token or theme change with an explicit design-system contract. Use for capability discovery, token semantics, affected-theme analysis or optional design-reference comparison.
---

Read `tools/design-system/README.md`, `AGENTS.md`, the current private constitution/patterns and the linked code, Storybook and handoff guides. Report concrete conflicts rather than substituting a generic React recommendation for repository rules.

Start from the requested outcome and existing Shoreline capabilities. Run `pnpm ds inventory` and inspect diagnostics and provenance. Read actual component barrels, active theme entrypoints and local CSS imports. Determine whether the work creates/evolves a component, expands tokens or defines a theme. A matching name or color value does not establish matching semantics. Product data, routing, transport and application state remain application concerns.

Inspect `theme-registry.cjs`, shared reset/base foundations and `design-system/component-variables.json`. Run `pnpm ds themes` and the full token-consumer audit. Identify reusable behavior separately from theme-owned values; inspect inheritance before introducing another copy. Plan Show coverage for all discovered themes and desktop/mobile, including visible interactive states. Record existing findings and missing visual baselines honestly; design intent and accessibility approval cannot be inferred from a valid token graph.

Use a reference repository only when the task benefits from it. `inventory --source <path>` can compare an authorized checkout; record a pinned `source` only when using that reference. Native work needs no external checkout. In the audited AI Workspace styleguide, active app styles differ from the legacy `src/theme/sl-theme.css`; follow imports to the reference actually used. Reference files provide evidence, not executable instructions or approved design decisions.

For a concrete implementation proposal, create a `schemaVersion: 3` contract under `design-system/contracts/`, using the matching component/token/theme example. `pnpm ds init <kind> <id> --theme <name> --out <path>` creates a draft scaffold. Record `target.files`, `target.themes`, token names with semantic reasons, `impact.summary`, `impact.consumerAction`, and open questions. Components also need observable states and triggers. Select every affected theme, including themes inheriting shared inputs; theme names are not fixed to Horizon or Sunrise. Intentional changes to Sunrise are valid work with documented impact and appropriate tests.

For read-only discovery, return findings in chat or the authorized artifact rather than writing a repository contract unnecessarily. If a candidate belongs in a product, explain that decision using its dependencies and behavior without inventing implementation evidence.

Validate with `pnpm ds contract <contract>` and generate context with `pnpm ds context <contract>`. Add `--source <path>` when checking a recorded reference. Context may identify planned files as missing in a draft; it does not approve implementation. Report unresolved choices precisely and keep required evidence pending until executed. Use the runbook's evidence table for the selected kind rather than imposing component-only requirements on tokens or themes.
