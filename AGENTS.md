# AGENTS.md — vtex/shoreline

> Mandatory rules and engineering patterns live in the private spec repo [`vtex/shoreline-specs`](https://github.com/vtex/shoreline-specs):
> - **Constitution** (non-negotiable rules): `vtex/shoreline-specs/.specify/memory/constitution.md`
> - **Engineering patterns** (how to apply them): `vtex/shoreline-specs/docs/patterns.md`
>
> The constitution **prevails in any conflict** with this document. If you can't access the spec repo, ask a maintainer for the relevant excerpt before merging.

## Product overview

[Shoreline](https://shoreline.vtex.com) is VTEX's design system: a React component library, design tokens, and TypeScript utilities. Distributed as `@vtex/shoreline`, `@vtex/shoreline-css`, `@vtex/shoreline-utils`, `@vtex/shoreline-ts-table`, `@vtex/shoreline-test-utils`. Consumed by VTEX Admin, partner apps, and storefront tooling.

## Stack

- **Runtime / peer**: React `>=18.3`, ReactDOM `>=18.3`, TypeScript `>=5`
- **Tooling**: Node `>=20`, pnpm `9.4.0` (enforced by `preinstall: only-allow pnpm`), Lerna `8.1.4`, Turbo `2.2.3`
- **Lint / format**: Biome `1.9.4` (single tool — no ESLint, no Prettier)
- **Bundler**: tsup → ESM + CJS + `.d.ts` per package
- **Component primitives**: `@ariakit/react`, `@react-aria/*`, `@react-stately/*`, `vaul`
- **Styling**: CSS Cascade Layers (`sl-reset`, `sl-base`, `sl-tokens`, `sl-components`); `data-sl-*` attribute architecture; design tokens as `--sl-*` CSS custom properties from `@vtex/shoreline-css`
- **Testing**: Vitest `1.6.0`, `@storybook/test-runner` + Playwright, Chromatic, Storybook `8.6.15`
- **Release**: `lerna publish --conventional-commits --create-release github` on push to `main`

## Repo structure

```
shoreline/
├── packages/
│   ├── shoreline/        # @vtex/shoreline — React components
│   ├── css/              # @vtex/shoreline-css — tokens + global styles
│   ├── utils/            # @vtex/shoreline-utils — TS helpers (no React)
│   ├── ts-table/         # @vtex/shoreline-ts-table — table primitives
│   ├── test-utils/       # @vtex/shoreline-test-utils — testing helpers
│   └── docs/             # docs site (Next.js)
├── templates/            # Plop templates for `pnpm gen:component`
├── scripts/              # CI/CD bash scripts
├── .github/workflows/    # GitHub Actions (PR, release, Chromatic)
└── turbo.json            # Turbo task pipeline
```

Workspace declared in `pnpm-workspace.yaml`: `packages/**`. Lerna config in `lerna.json`.

## How to run

| Goal | Command |
|---|---|
| Bootstrap | `pnpm i && pnpm build` |
| Run unit tests | `pnpm test` (watch) / `pnpm test:ci` (run) |
| Run Storybook tests | `pnpm test:storybook` |
| Lint (check) | `pnpm lint` |
| Lint (write) | `pnpm lint-fix` |
| Dev — Storybook | `pnpm dev:storybook` |
| Dev — Docs site | `pnpm dev:docs` |
| Generate component scaffold | `pnpm gen:component` |
| Generate icon | `pnpm create:icon` / `pnpm create:icon-variant` |
| Figma Code Connect (dry-run) | `pnpm figma:connect:dry-run` |
| Figma Code Connect (publish) | `pnpm figma:connect:publish` |

Release runs in CI only: `.github/workflows/release.yml` invokes `pnpm lerna publish --yes --force-publish --no-private --conventional-commits --create-release github` after build + lint + tests pass on `main`.

## Tests

- **Unit**: Vitest under each package; co-located in `tests/` next to components.
- **Storybook play tests**: `*.play.stories.tsx` files run via `@storybook/test-runner` + Playwright.
- **Visual regression**: `*.show.stories.tsx` files captured by Chromatic on every PR. Failing diffs must be reviewed before merge.
- **Type checks**: `tsc --noEmit` is part of the package `build` task in `turbo.json`.
- **Coverage floor**: every public package MUST keep **≥ 80% line coverage** (enforced by Vitest thresholds in CI). New components ship with at least one unit test + one play test + a `show.stories.tsx` variant matrix; bug fixes ship with a regression test in the same PR.

CI gates (`.github/workflows/pr.yml`): `pnpm install` → `pnpm build` → `pnpm lint` → `pnpm test:ci` → Chromatic → semantic PR title check (`amannn/action-semantic-pull-request@v5`).

## Code conventions

- **Conventional Commits** enforced by Husky `commit-msg` (`commitlint.config.js`). Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`. Breaking change → `feat!:` / `fix!:` + `BREAKING CHANGE:` footer.
- **Biome** for both lint and format. Single quotes, no semicolons. `pnpm lint-fix` before pushing.
- **Component scaffold**: always start with `pnpm gen:component <Name>` (Plop generates `forwardRef`, `data-sl-{kebab-name}`, co-located CSS, stories, tests, and the `index.ts` export).
- **Type pair**: every component exports `<Name>Options` (own props) AND `<Name>Props` (with HTML attrs). JSDoc requires `@status`, `@example`, per-prop `@default`.
- **No hard-coded styles**: only `--sl-*` tokens inside `@layer sl-components`. Variants via `data-{prop}` attributes.
- **Husky pre-commit**: runs `pnpm i && pnpm lint-staged`. Bypassing hooks is forbidden outside the release workflow.

The full set of rules and patterns lives in the spec repo (constitution + `docs/patterns.md`). Read those before authoring a new component or refactoring an existing one.

## Where to make changes

| Task | Path |
|---|---|
| Add or edit a React component | `packages/shoreline/src/components/<name>/` |
| Add a design token | `packages/css/src/` |
| Add a TS helper (no React) | `packages/utils/src/` |
| Add a table primitive | `packages/ts-table/src/` |
| Add a test helper | `packages/test-utils/src/` |
| Update docs site | `packages/docs/` |
| Edit Plop scaffold templates | `templates/` |
| Edit CI workflows | `.github/workflows/` |
| Edit lint rules | `biome.json` |
| Edit Turbo task pipeline | `turbo.json` |
| Edit release flow | `.github/workflows/release.yml`, `lerna.json` |

## Gotchas

- **pnpm only**: `npm install` and `yarn install` will fail (`only-allow pnpm`). Use `pnpm@9.4.0` (Corepack: `corepack enable && corepack prepare pnpm@9.4.0 --activate`).
- **Node 20 minimum**: `engines.node: ">=20"` in root `package.json`.
- **Sibling components in `packages/shoreline/src/components/<name>/` MUST import siblings via the package barrel** (`../<sibling>`), not via deep paths (`../<sibling>/internal/foo`). The constitution forbids deep cross-component imports.
- **`forwardRef` is required** for every component until the project migrates to React 19. Don't switch to ref-as-prop without amending the constitution first.
- **Stories trifecta**: every component ships `examples.stories.tsx` (real-world; Chromatic disabled), `play.stories.tsx` (interactive), `show.stories.tsx` (variant matrix; Chromatic enabled). Adding a new visual state means adding a row to `show.stories.tsx`.
- **Next.js consumers MUST add `experimental.optimizePackageImports: ['@vtex/shoreline']`** to avoid 200-800ms barrel-import cost. This affects them, not us, but is the most common consumer issue.
- **Chromatic baseline drift**: visual changes that affect more than one component require explicit reviewer approval. Don't accept a baseline without scanning every diff.
- **Husky `HUSKY=0` is reserved** for the release workflow only. Do not set it locally to skip hooks.
- **Figma Code Connect** requires `FIGMA_ACCESS_TOKEN` env var; dry-run first to avoid publishing partial mappings.

## Resources

- [Shoreline docs site](https://shoreline.vtex.com)
- [Storybook (Chromatic)](https://www.chromatic.com/library?appId=63d76125e10d05b48de72bb1)
- [Spec repo](https://github.com/vtex/shoreline-specs) — constitution + engineering patterns + feature specs (private)
- [Spec Kit](https://github.com/github/spec-kit) — slash commands for SDD
- [Ariakit](https://ariakit.org), [React Aria](https://react-spectrum.adobe.com/react-aria/), [Vaul](https://vaul.emilkowal.ski) — primitive libraries
