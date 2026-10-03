# Shoreline design-system runbook

This toolkit helps the team create and validate **components, tokens and themes in Shoreline**. It combines repository skills, explicit contracts and deterministic checks with engineering and design review. Horizon is the first new theme supported by this workflow; Sunrise remains the existing default. A design reference such as AI Workspace can inform a task, but no external repository is required.

See the [engineering and design proposal](../../docs/design-system/proposta.md) for the audit, research, architecture and adoption plan.

## Contribution rules and theme architecture

Read the [private constitution](https://github.com/vtex/shoreline-specs/blob/main/.specify/memory/constitution.md) and [engineering patterns](https://github.com/vtex/shoreline-specs/blob/main/docs/patterns.md), then [AGENTS.md](../../AGENTS.md). The constitution prevails. Local references are the [code styleguide](../../packages/docs/pages/guides/code/code-styleguide.mdx), [Storybook guideline](../../packages/docs/pages/guides/code/storybook-guideline.mdx), [component model](../../packages/docs/pages/guides/code/component-model.mdx), [test guideline](../../packages/docs/pages/guides/code/test-guideline.mdx), [development guideline](../../packages/docs/pages/guides/code/development-guideline.mdx) and [design handoff](../../packages/docs/pages/guides/design/handoff-requirements.mdx).

The source uses CSS under `packages/shoreline/src/themes/*`; `packages/css` is the CSS build engine. Some older guides still describe Sass. The docs prefer body destructuring while the constitution prescribes defaults in the signature; follow the constitution and keep the governance disagreement visible. Play is a props playground, Show is the visual matrix, Examples demonstrate usage and `stories/tests` contains behavioral cases. Only Show enables Chromatic snapshots. Filenames alone do not prove test execution or coverage.

Themes share React components. `@vtex/shoreline/css` and `@vtex/shoreline/themes/sunrise` currently select Sunrise. Applications choose Horizon with:

```tsx
import '@vtex/shoreline/themes/horizon'
import { Button } from '@vtex/shoreline'
```

Horizon follows Shoreline and Sunrise's landscape/light vocabulary and can be used by Studio or other products. Reset and base rules come from the theme-independent `packages/shoreline/src/foundations` sources, imported by both themes. Horizon still explicitly inherits Sunrise token defaults and component rules, with selected token values and six additions in Horizon: `--sl-radius-4`, `--sl-font-weight-bold`, `--sl-shadow-3`, `--sl-shadow-4`, `--sl-shadow-5` and `--sl-overlay-bg`. See [the theme notes](../../packages/shoreline/src/themes/horizon/README.md) for provenance and scope.

The directory-based [theme registry](theme-registry.cjs) is shared by CSS builds, Storybook, Plop and visual tooling. Common sources stay outside `src/themes` so they cannot accidentally become a selectable theme. `ds themes` verifies the expected entries, public exports, import graph, layer ownership and reuse of shared reset/base. Adding a directory does not establish a valid or approved theme.

Shared resets and token-driven global element styles belong in [foundations](../../packages/shoreline/src/foundations/README.md). Themes can append deliberate additions after their shared imports. The entrypoints own cascade layers; imported sources must not duplicate those wrappers. The development CSS watcher includes both themes and foundations. Component appearance and palettes stay in themes until their shared semantics are designed.

Tokens and themes may evolve together, including intentional Sunrise changes. Record the affected themes and consumer impact in the contract, and check each theme's resulting behavior. A previous Sunrise snapshot is a review aid, not an immutable compatibility constraint. Shared code must not depend on a token missing from a supported theme: provide it in that theme, use a deliberate fallback or keep the usage theme-specific.

Select one complete theme per document. Global selectors and `:root` variables mean that importing two complete themes together makes the result depend on the CSS cascade. Shared React code and stories must not inject a specific theme. Select the theme centrally in the application or Storybook and compare themes in isolated documents/builds. Each theme has full, tokens, reset, base and components entrypoints, including `/unlayered` variants.

## Commands

Use Node >=20, pnpm 9.4.0 and the workspace dependencies. Commands run from the repository root; `--root PATH` supports isolated fixtures. Contract paths and `--files` are relative to the target root. `--source` and report `--out` paths resolve from the working directory. For `init`, `--out` is a repository-relative JSON path. Quote paths containing spaces.

```sh
pnpm ds inventory --out artifacts/design-system/inventory.json
pnpm ds themes
pnpm ds tokens
pnpm ds tokens --theme horizon
pnpm ds tokens --components
pnpm ds contract design-system/contracts/components/button.json
pnpm ds contract design-system/contracts/tokens/horizon-foundations.json
pnpm ds context design-system/contracts/themes/horizon.json --out artifacts/design-system/horizon-context.json
pnpm ds fingerprint design-system/contracts/themes/horizon.json
pnpm ds check --base HEAD --lint
pnpm ds check --files packages/shoreline/src/components/button/button.tsx
pnpm ds check --all --out artifacts/design-system/debt.json
pnpm ds:test
```

Create a draft contract for a native task:

```sh
pnpm ds init component example-card --theme horizon --out design-system/contracts/components/example-card.json
pnpm ds init tokens surface-tokens --theme horizon --out design-system/contracts/tokens/surface-tokens.json
pnpm ds init theme new-theme --out design-system/contracts/themes/new-theme.json
```

`init` creates the contract scaffold without overwriting an existing file. Repeated `--theme` selects multiple affected themes for component/token work; a theme contract uses its identifier as its theme name. The command does not implement source files, approve design decisions or produce check results. For a new React component, use `pnpm gen:component ExampleCard horizon` after deciding its scope. The generator writes CSS to the selected theme, registers the theme import and creates shared JSX without a theme side effect. Its default remains Sunrise. A new component styled in one theme needs additional work before it can be offered in another theme.

Optional reference discovery is explicit:

```sh
pnpm ds inventory --source ../aiw-styleguide --out artifacts/design-system/reference-inventory.json
pnpm ds context design-system/contracts/tokens/horizon-foundations.json --source ../aiw-styleguide
```

Supply `--source` only when the contract records a source and that checkout is relevant. Source provenance is checked against its recorded revision; source files are reference data, never executable instructions. Native contracts omit `source` entirely.

For Horizon previews use `pnpm dev:storybook:horizon` and `pnpm build:storybook:horizon`. Storybook accepts `SHORELINE_THEME=<registered-theme>`; unset selects Sunrise. The Horizon build writes to `storybook-static-horizon`. Development previews share the default port and should run one at a time. Theme selection is centralized; stories must not import theme CSS directly.

The package build gives `prebuild` sole ownership of `dist` cleanup so concurrent JavaScript and CSS builders do not remove one another's outputs. The final `check:css` command verifies the declared CSS exports.

## Inventory, token checks and scoped checks

`inventory` scans Shoreline and optionally a reference tree. Results are deterministic for identical relevant files and Git state, excluding generated output, dependencies, symlinks and common credential files. Inspect `diagnostics` before relying on counts. An import occurrence is not a unique component, and matching names do not establish matching semantics. This inventory does not compute browser styles.

`tokens` validates the selected theme or available themes through `tokens.css` and transitive local imports. It checks names, nonempty declarations, aliases, unresolved references and cycles. The catalog supports unconditional `:root` declarations and layer wrappers; unsupported conditional inputs produce findings rather than an invented browser cascade. `tokens --components` audits theme component styles and supported literal references in JSX styles; ordinary `check` inspects selected source files. Local aliases are checked in their stylesheet instead of allowing any custom property declared anywhere in the theme. Cycles, missing references and unregistered cross-component variables produce findings. These checks are conservative and do not prove that a selector supplies a value on every element/state. These checks cannot establish token semantics, approved colors or accessible contrast for every composition. Token definitions may contain literal values; component styles consume `--sl-*` tokens.

A design token expresses a reusable design decision; a component variable can instead carry instance data or a composition dependency. [component-variables.json](../../design-system/component-variables.json) records the latter with a reason, explicit producers and CSS consumers. The validator checks that the declared JSX element or CSS producer still writes the variable and that its consumers still reference it. For example, Toast stack index and Table column widths remain runtime values. A global list of permitted names would hide misspellings and is not sufficient. DOM inheritance and conditional runtime values still require browser coverage.

When changing or removing a token already consumed by components, also run `pnpm ds tokens --components` and inspect the wider impact. The changed-file check alone does not inspect untouched consumers. Some findings may involve values supplied at runtime; verify those paths rather than silently suppressing a finding or claiming the static graph proves computed-style resolution.

`check` validates all registered contracts under `design-system/contracts`, all theme token catalogs and structural requirements, selected component references, and policies for selected files. Exactly one of `--files`, `--base` or `--all` is required; repeated `--files PATH` is supported. `--base` compares with merge-base and includes committed, staged, unstaged and untracked nonignored changes. `--all` diagnoses existing debt; there is no automatic debt suppression. The changed-file policy gate checks entire files, so touching legacy code may require cleaning existing findings in that file. Theme changes are evaluated as design-system work rather than rejected because they touch Sunrise.

`--lint` also runs [the stricter Biome profile](biome.json) for selected TypeScript/CSS, including stories and tests. It uses Biome 1.9.4 hook, key, `any` and accessibility rules without changing the root profile or adding ESLint. It can be run directly:

```sh
pnpm exec biome check --config-path tools/design-system packages/shoreline/src/components/button/button.tsx
```

Exit codes are `0` for requested checks passed, `1` for findings and `2` for invalid inputs or execution errors. Validating a draft is not completing an implementation.

## Visual and accessibility checks across themes

[The visual runner](visual/) builds an isolated Storybook for every registered theme and reads the actual Storybook `index.json`. Its manifest requires the same nonempty set of Show stories in each theme, then enumerates **every Show story × every theme × desktop (1280×900) and mobile (390×844)**. Stories retain the existing contribution categories: Show for visual states, Examples for compositions and Play for controls. Use explicit behavior tests for interaction sequences that a Show story does not exercise. A new visual state must be represented in Show; a complete manifest cannot detect a state that was never authored.

Run from the repository root:

```sh
pnpm build
pnpm ds:visual:build
pnpm ds:visual:check
pnpm ds:visual:capture --grep button
```

The build writes `artifacts/design-system/storybooks/<theme>` and `manifest.json`. Changes to the registered themes, relevant source/configuration, built theme CSS or story indexes invalidate the build; rebuild before the next run. The check compares the full matrix and rejects missing baselines, mismatches, incomplete reports or skipped cases. Filters are allowed only in diagnostic capture mode. Reports, images, traces and `run.json` live under `artifacts/design-system/visual/<mode>`.

Each browser case waits for Storybook's render/play completion, loaded fonts and images, checks browser errors, runs axe against the rendered document and captures the complete page. External requests are blocked so that network assets cannot silently vary or disappear. Time, pseudo-random data, locale, timezone, color scheme, pixel ratio and animation settings are controlled. Stories must provide local assets and deterministic data; do not suppress a failed capture to make the matrix pass.

Open a diagnostic report with `pnpm exec playwright show-report artifacts/design-system/visual/capture/html`. Each case retains `diagnostic.png`, `accessibility.json` and `environment.json` under its results directory; failed cases also retain traces. The comparison mode supplies expected/actual/diff images when a baseline exists.

The canonical baseline environment is Linux with the bundled Chromium for Playwright **1.44.1**, using `mcr.microsoft.com/playwright:v1.44.1-jammy`. Keep the package, image and generated baselines in the same version change. [Playwright documents environment-dependent rendering](https://playwright.dev/docs/test-snapshots) and [matching package/image versions](https://playwright.dev/docs/docker). Local macOS or `SHORELINE_VISUAL_CHANNEL=chrome` results are diagnostics, not replacements for the canonical baseline. Mobile here means a mobile-sized viewport in Chromium; it does not claim real-device or WebKit coverage.

The initial baseline must be generated in that environment, reviewed by engineering and design, and committed under `design-system/visual-baselines`. The explicit command writes candidates:

```sh
pnpm ds:visual:update
```

Run it outside CI. It is never an automatic repair for a failing check. `capture` and `update` record diagnostic results with human review pending; neither establishes visual acceptance. `check` does not update images and requires the entire matrix. Review screenshots and accessibility attachments before accepting an intentional design change; an initial baseline records the current appearance and can preserve an existing defect if accepted without inspection.

For canonical candidate generation, use a separate Linux checkout inside the pinned container, with Node 20 and pnpm 9.4.0, and declare `SHORELINE_VISUAL_ENVIRONMENT=mcr.microsoft.com/playwright:v1.44.1-jammy`. Install dependencies, run `pnpm build`, `pnpm ds:visual:build`, then the explicit update command above. Review each candidate and resolve axe/rendering findings before running `pnpm ds:visual:check`. The receipt records versions, platform, architecture, browser and declared image; the image declaration is metadata, not a cryptographic attestation. Never copy local macOS baselines into the Linux directory.

Axe violations fail a browser case, including capture mode. Automated checks cover only rendered states and supported rules. Keyboard operation, focus movement, zoom, screen readers and semantic design review remain explicit obligations. The [Storybook 8 accessibility guide](https://storybook.js.org/docs/8/writing-tests/accessibility-testing) describes the role and limits of automated checks.

Chromatic remains the shared visual review service. Its blocking configuration must wait for the completed build and use `exitZeroOnChanges: false`, with no automatic acceptance; `exitOnceUploaded` alone does not wait for test results. [Chromatic's GitHub Actions guide](https://www.chromatic.com/docs/github-actions/) explains failure on unaccepted changes. The existing Sunrise project and canonical local matrix have separate baselines: publishing every theme to the same project would replace one theme's baseline with another. Use separate configured projects if hosted review is expanded to additional themes. Required branch checks and reviewed baseline changes are repository administration/review work, not actions performed by the runner.

## Contract and evidence model

The internal format is `schemaVersion: 3`, defined by [contracts.mjs](contracts.mjs); it is not DTCG or a JSON Schema standard. Examples cover [a component](../../design-system/contracts/components/button.json), [tokens](../../design-system/contracts/tokens/horizon-foundations.json) and [a theme](../../design-system/contracts/themes/horizon.json). They remain drafts until the decisions and evidence are complete.

| Field | Meaning |
| --- | --- |
| `id`, `kind`, `intent` | Stable identifier, `component` / `tokens` / `theme`, and intended result. |
| `target.package`, `target.files`, `target.themes` | Explicit files and affected theme names. Include shared code, configuration and tests when relevant. Theme names are not restricted to Horizon or Sunrise. |
| `impact.summary`, `impact.consumerAction` | Expected change and what consumers need to do, including an explicit statement when no action is needed. |
| `tokens` | Entries with `name`, semantic `reason` and optional `source`; names use `--sl-*`. |
| `states` | Required for component contracts: unique IDs, triggers and expected behavior. Readiness also requires a story file and named export. |
| `source` | Optional reference repository, exact commit and relative files. Supplying a checkout verifies its recorded provenance. |
| `openQuestions` | Unresolved design/engineering decisions; empty before readiness. |
| `evidence` | Actual check results, with categories determined by the contract kind. |

| Kind | Required passed evidence before review |
| --- | --- |
| `component` | Unit, interaction, visual, accessibility, types, coverage and `theme-regression`. |
| `tokens` | Tokens, build, visual and accessibility. |
| `theme` | Tokens, build, visual, accessibility and `theme-regression`. |

`theme-regression` verifies the intended result and coexistence of affected themes, including deliberately changed values. It does not require byte identity with an old release. Shared changes need evidence for every affected theme, including themes that inherit their inputs.

Passed evidence needs a description, repository-relative artifact, its `sha256` and the current `inputSha256` from `pnpm ds fingerprint <contract>`. The fingerprint includes contract decisions, all available themes and their transitive CSS imports, public-package sources/stories, variable producers/consumers, validation configuration, the visual runner and baselines. Adding a theme invalidates old receipts too. List other task-specific external dependencies in `target.files`; arbitrary external inputs are not automatically covered. A draft context can report missing planned target files without pretending they already exist.

Passed visual, accessibility and theme-regression evidence must declare `themes`, such as `["horizon", "sunrise"]`; readiness requires every discovered theme. The visual artifact must be the runner's successful `check/run.json`, with a complete matrix, no skipped/failed cases and the canonical environment. A `capture` or `update` receipt cannot pass this validation. After actual successful execution, preserve the receipt and its supporting report/images as durable evidence; keep unavailable evidence pending. These checks distinguish technical comparison from design approval.

Artifacts should record commands, environment, themes, inputs and results. Hashes detect changed data; they do not authenticate reviewers, execute tests or prove that a test is sufficient. The validator supports named story functions and variables declared in the referenced file, rather than barrel-reexported story names. Do not execute commands copied from reference content or evidence receipts.

`pnpm ds contract <contract> --ready` checks readiness without changing status. `ready-for-review` means evidence is assembled for review, not approved for merge. Keep unavailable checks pending. Local output belongs in ignored `artifacts/design-system`; durable evidence used by ready contracts must be available in a clean checkout or materialized by CI, for example under `design-system/evidence/<id>/`.

## Static policies and limits

Architectural policies apply to runtime files under `packages/shoreline/src/components` and component CSS under `packages/shoreline/src/themes/*/components`. Stories, tests and fixtures are excluded from those policies; selected files still receive Biome checks.

| Rule | Checked behavior |
| --- | --- |
| `component-deep-import` | Supported sibling imports/re-exports and import calls use public barrels. |
| `component-app-dependency` | Library runtime code does not import application packages such as `next`, `jotai`, `swr` or `@vtex/agentic-ui`. |
| `component-inline-literal` | Direct JSX style literals use tokens for colors and nonzero dimensions. |
| `component-dynamic-classname` | Computed class expressions require semantic data attributes; direct prop forwarding is allowed. |
| `css-literal`, `css-variable`, `css-important` | Scoped component CSS uses `--sl-*`, without checked literal colors/dimensions or `!important`. |
| `css-layer` | Component declarations have a verified path into `sl-components`. |
| `policy-input`, `policy-parse` | Missing/escaping inputs and syntax failures are findings. |

These checks do not resolve every alias, computed import, JSX spread, indirect style, CSS unit/color syntax, ref/ARIA behavior, public API contract or token meaning. Token graphs do not replace computed-style testing. Extend rules using demonstrated misses and regression fixtures; use the TypeScript compiler or dedicated graph/API tools for deeper analysis.

## Skills, CI and validation status

Use [discovery](skills/shoreline-discovery/SKILL.md) to scope work and inventory existing capabilities, [creation](skills/shoreline-create/SKILL.md) to create or evolve components/tokens/themes, and [review](skills/shoreline-review/SKILL.md) for an independent check. These repository instruction files do not install a global skill or agent runtime. Register them using the chosen client's supported discovery mechanism when desired. [Evaluation scenarios](evals.md) test their observable behavior; one successful run is not a reliability benchmark.

[design-system.yml](../../.github/workflows/design-system.yml) runs tooling tests, lint, scoped policies, full token/structural checks and the complete browser matrix in the pinned Playwright container. Missing baselines fail rather than being created in CI. Manual diagnostic captures use a different check-run name from the comparison gate. The theme registry is a Turbo global dependency, so its changes invalidate package build caches. Native work needs no external checkout. A pinned optional reference is verified only where its authorized checkout is available. Configure required branch checks through the team's normal process; no branch settings were changed by the toolkit.

Build, type checks, relevant unit and Storybook interaction tests and human design review remain separate evidence. The visual runner adds axe checks and screenshots for the rendered Show matrix across registered themes. It does not establish full interaction coverage or the constitutional package coverage floor. A generated Show matrix is a seed, not an exhaustive state matrix.

This round added the shared foundation sources, structural theme validation, explicit runtime/composition variables, and the browser matrix. The isolated foundation extraction preserved all 20 emitted CSS files byte for byte. Subsequent repairs to seven unresolved references in Modal, Table, EmptyState and Radio intentionally change previously unresolved foreground/background/letter-spacing declarations. Eight existing component dimensions became tokens without changing their values. The catalogs now contain 274 Sunrise and 280 Horizon tokens; the full component token-reference audit passed with zero findings after those repairs. This does not mean the broader policy audit or browser matrix has passed.

The integrated tooling suite passed 100 tests; the existing Vitest suite passed 179 tests in 30 files. Builds, lint and changed-file checks passed. The broad legacy policy audit reports 89 findings without automatic suppression. The final local browser capture executed all 204 cases with 204 screenshots and no skipped cases: 168 passed rendering/axe checks and 36 failed axe across nine stories in all four theme/viewport combinations. Findings concern contrast, button names, labels and target sizes. See the proposal for the breakdown and the diagnostic run receipt/report for details.

This browser run used macOS/Chrome and did not compare approved baselines. Initial canonical baselines, remote CI execution, reviewed Chromatic/design results, complete interaction coverage and the minimum coverage per public package remain pending until verified. The three example contracts remain drafts. Valid structure, a successful build, candidate screenshots or a diagnostic capture do not approve their semantic decisions or release readiness.

## Tool choices and further adoption

Keep Biome 1.9.4 for repository lint/format and use the small TypeScript/PostCSS validators for Shoreline-specific rules. [Stylelint](https://stylelint.io/user-guide/rules/) offers broader CSS language rules, including property/value checks, and is a candidate when demonstrated gaps justify another maintenance surface. It was not installed alongside overlapping lint rules. [Biome plugins are a version 2 capability](https://biomejs.dev/blog/biome-v2/), so adopting them requires a separate version migration.

[DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/) and [Style Dictionary](https://styledictionary.com/info/dtcg/) can support a future typed token exchange/build source shared with design tools. They are not the contract format or an additional source of truth in this delivery. Agree on ownership, naming, aliases and generated outputs before introducing conversion. [Style Dictionary v5 requires Node 22](https://www.styledictionary.org/versions/v5/migration/), above this repository's Node 20 minimum. Playwright, axe, Storybook and Chromatic already address the present browser-validation need; adding another screenshot service is unnecessary without an unmet requirement.
