# Shared CSS foundations

Theme-neutral sources imported by every theme in `src/themes/*`. They are not a
theme and have no public entrypoint of their own: each theme's `reset.css` and
`base.css` import them, and the CSS build bundles them into that theme's output
with the right cascade layer.

- `reset.css` normalizes browser defaults (box-sizing, margins, media, form fonts).
- `base.css` applies global element styles through semantic tokens
  (`--sl-bg-base`, `--sl-fg-base`) supplied by the selected theme.

Rules:

- Change shared reset or base behavior here, once. Theme-specific additions go
  after the shared import in that theme's `reset.css` or `base.css`.
- Do not declare token values or component rules here, and do not import from
  `src/themes/`.
- Do not wrap rules in `@layer`: the build assigns `sl-reset` and `sl-base`
  when it emits each theme.
