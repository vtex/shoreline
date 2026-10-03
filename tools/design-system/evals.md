# Design-system agent evaluation

These reproducible tasks evaluate the repository skills and tooling. Use isolated worktrees or temporary fixtures. Record the repository revision, optional reference revision, model/version, skill revision, task prompt, tool calls, diff, executed checks, elapsed time and human corrections. Repeat scenarios before comparing configurations; no reliability benchmark is claimed by this document.

| Task | Expected observable outcome | Evaluator |
| --- | --- | --- |
| Create a native component with no external reference repository | Produces a component contract and scaffold with explicit themes, observable states and consumer impact; never requests an AI Workspace checkout | Contract validator, scaffold checks and engineering review |
| Expand the radius scale in both Sunrise and Horizon | Updates the declared themes and semantic tokens deliberately; runs token/build checks and records visual/accessibility evidence rather than rejecting Sunrise changes | Token checks and design review |
| Create a new theme with a name unrelated to Horizon | Accepts the new theme name, creates entries/exports as scoped, validates inheritance/layers and records theme-kind evidence | Contract validation, build and browser checks |
| Request only a token draft | Creates `kind: tokens` with semantic reasons and pending applicable evidence; does not require a component Show export or invent a source commit | Contract validator |
| Reference an undefined token or create an alias cycle | Reports the graph problem; fixes the definition/reference without suppressing checks | `pnpm ds tokens` and regression fixtures |
| Remove a token referenced by an unchanged component | Runs the broader `tokens --components` audit, identifies affected consumers and verifies any runtime-provided values rather than relying only on the changed-file gate | Token audit and browser/engineering review |
| Implement a deep sibling import, literal component CSS and `!important` | Policy rejects violations; corrected code uses a public barrel and appropriate tokens | `pnpm ds:test` and scoped policy |
| Review a draft whose evidence is all pending | Reports implementation/readiness gaps; `contract --ready` fails | Contract validator |
| Change a target or transitively imported theme file after recording evidence | Stale fingerprint is rejected; relevant checks rerun before new receipts | Contract validator |
| Generate context for a native draft that plans a new file | Reports the missing planned file without requiring it to exist or calling the draft complete | Context output and readiness validation |
| Supply an optional reference checkout at a different commit | Reports the provenance mismatch; does not silently repin the contract | Source validation |
| Compare a product OverviewCard as an optional design reference | Identifies application data/i18n/dependencies and proposes only reusable capabilities for Shoreline | Source-backed engineering review |
| A Play playground exists but no interaction test ran | Reports playground and behavior evidence separately | Storybook guideline and actual test output |
| Create a theme contract without `theme-regression` evidence | Readiness fails; agent records the intended behavior of affected themes rather than freezing an old version | Contract validator and visual review |
| Import two full themes into one Storybook preview | Uses isolated builds/documents and theme-specific evidence instead of asserting subtree isolation | Storybook configuration and browser review |
| Add another theme without updating hand-maintained lists | Registry finds it; missing entries/exports fail, visual manifest includes it and previous evidence expires | Theme and contract tests |
| Define a private variable only in an unrelated component | Consumer fails until a real shared producer/consumer contract or theme token is provided | Token and variable provenance tests |
| Duplicate reset or put a layer inside split CSS | Structural validation rejects missing shared imports and nested layer ownership | Theme-structure regression tests |
| Run visual checks without a baseline or with an omitted theme | Check fails; capture can collect diagnostics without approving or creating a baseline | Playwright and matrix completeness checks |
| Produce a screenshot with unresolved axe violations | Image remains diagnostic; accessibility evidence cannot be marked passed | axe output and independent review |

Measure contract completeness, deterministic pass rate, regression rate, false positives, unsupported claims, human corrections and time to accepted work. Include review/rework time in speed comparisons. API clarity, token semantics and visual fidelity need an engineering/design rubric; an LLM score is not a substitute for tests or visual acceptance.

## Recorded native-work evaluation

An independent agent exercised the creation skill in an isolated fixture without an external source checkout. It created draft contracts for `surface-raised` tokens targeting Sunrise and Horizon and for a new theme named Dusk. `init`, draft contract validation and context generation succeeded. Readiness correctly rejected unresolved decisions and pending evidence; the agent did not invent approved token values or claim finished implementation.

The exercise led to narrower improvements: the repository guide points to the actual token directory, initializer questions reflect the contract kind, suggested component/theme inputs include relevant barrels and package impact, and generated JSON follows the repository formatter. All three skill files passed the skill frontmatter/scaffold validator. These are observed workflow results from one exercise, not a repeated reliability benchmark or semantic approval of the proposed token/theme.
