# Shared CSS foundations

These sources contain behavior shared by themes. They are not a theme, do not declare palette values, and have no public entrypoint of their own. Theme entrypoints import them and assign their cascade layers; the CSS build bundles them into each theme without requiring an additional consumer import.

- `reset.css` normalizes browser defaults, sizing and media behavior.
- `base.css` supplies global element styles through semantic tokens supplied by the selected theme.

Both Sunrise and Horizon import these sources. Add a shared reset or global base behavior here once; put a theme-specific change after the shared import in that theme's entrypoint. Keep these files free of imports from `themes/` to avoid coupling the shared layer to a particular visual identity. Do not add `@layer` wrappers here: the public theme entrypoints own the layer, including the unlayered outputs.

Shared foundation changes affect every importing theme and require their visual and accessibility checks. Preserve token-driven styles in `base.css`; browser normalization in `reset.css` is not a source of component appearance values. Promoting a component rule or token set to foundations requires agreement that its meaning is shared, complete token coverage in each consuming theme, and the same checks. Copying CSS between themes creates separate sources and should be avoided.

Horizon currently inherits Sunrise's token defaults and component rules explicitly in its own entrypoints. Those files contain theme decisions and remain outside foundations until their shared responsibilities are designed. Theme overrides come after inherited inputs. This keeps the remaining dependency visible while making reset and global base behavior independent of either theme.
