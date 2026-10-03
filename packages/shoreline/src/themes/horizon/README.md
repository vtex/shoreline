# Horizon theme

Experimental Shoreline theme for Studio and other products. Horizon follows Shoreline and Sunrise's landscape/light vocabulary; its identity is independent of any application. Components remain shared with Sunrise, and the current `@vtex/shoreline/css` and `@vtex/shoreline/themes/sunrise` entries select Sunrise.

```tsx
import '@vtex/shoreline/themes/horizon'
import { Button } from '@vtex/shoreline'
```

Select one complete theme per document. Tokens target `:root` and component selectors are global, so loading two complete themes makes the result depend on the cascade; it does not isolate subtrees. Shared React components need no theme prop or separate package.

The theme exposes ten CSS entrypoints: the full theme, `unlayered`, `tokens`, `tokens/unlayered`, `reset`, `reset/unlayered`, `base`, `base/unlayered`, `components` and `components/unlayered`. With split entrypoints, declare `@layer sl-reset, sl-base, sl-tokens, sl-components;` before loading styles and consistently select layered or unlayered files. The full layered entry establishes that order through the build.

## Token decisions and design references

`tokens.css` imports `../sunrise/tokens.css` before `tokens-foundations.css`. The foundations use selected declarations from the AI Workspace design reference, `app/theme.css` at commit `baceafacc9e32a863987dad06da5a6654b387d6b`. This provenance explains the initial values; building or extending Horizon does not require that repository, its runtime or an extraction workflow.

Included foundations are radii, gray/blue palettes, muted backgrounds and foregrounds, soft/disabled foregrounds, bold font weight, shadows and overlay background. Six tokens expand the current vocabulary in Horizon: `--sl-radius-4`, `--sl-font-weight-bold`, `--sl-shadow-3`, `--sl-shadow-4`, `--sl-shadow-5` and `--sl-overlay-bg`. Other values come from the inherited theme inputs. These six additions are currently defined in Horizon; defining them in another theme is an ordinary token-design decision with its own affected consumers and tests.

Sunrise's `tokens-components.css` also exposes the existing Modal width/footer dimensions and EmptyState width/large illustration dimensions as semantic component tokens. Horizon inherits those eight declarations. Their values preserve the previous literal dimensions; they are separate from Horizon's six additions. Shared spacing still consumes the existing `--sl-space-*` scale. Corrected missing references in Modal, EmptyState, Table and Radio now resolve to the intended background, foreground and body letter-spacing tokens in each theme; these fixes require reviewed visual evidence in both themes.

Sidebar/composer tokens, product-specific stacking, status redeclarations, the `--sl-bg-strong-disabled` alias and a table-cell override were not selected for these foundations. They need their own semantic decisions before becoming public design-system capabilities. Reset and base styles come from theme-independent sources in [`src/foundations`](../../foundations/README.md), which both themes import. Component rules and token defaults still come explicitly from Sunrise; their visual decisions have not been promoted to shared foundations. Existing components consume the changed palette, radius and shadow values; declaring an overlay token by itself does not define a complete modal design.

## Creating and evolving theme capabilities

Record theme work or token additions using the native contracts described in [the design-system runbook](../../../../../tools/design-system/README.md). Include every affected theme in `target.themes` and describe consumer impact. Add token declarations here and component CSS under `components/`, registering its import after inherited rules. Entrypoints own `sl-components`, avoiding nested copies of the same layer. A shared reset or global base change belongs in `src/foundations` and requires validation in all themes that import it; do not duplicate it under individual themes.

Sunrise and Horizon can both evolve. Deliberate shared token changes are allowed under contribution rules; verify resulting behavior in each affected theme, including inherited inputs. Shared component styles need a valid token or explicit fallback in every supported theme. React components and stories must not import a specific theme as a side effect.

Run `pnpm ds tokens --theme horizon`, `pnpm ds check --base HEAD --lint`, `pnpm --filter @vtex/shoreline build:css` and `pnpm ds:test` as appropriate to the change. `pnpm dev:storybook:horizon` and `pnpm build:storybook:horizon` select Horizon; ordinary Storybook commands select Sunrise. Use separate documents/builds for comparisons. Static token graphs, emitted CSS and fingerprints support validation; contrast, interaction and reviewed Show states still need browser and design evidence.
