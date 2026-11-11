/**
 * Registry of the themes shipped by `@vtex/shoreline`.
 *
 * Every tool that needs the theme list reads it from here: the CSS build
 * (`src/scripts/build-css.ts`), the Storybook preview (`.storybook/preview.js`)
 * and the theme contract test (`src/themes/tests/theme-contract.test.ts`).
 *
 * To add a theme:
 * 1. create `src/themes/<name>/` with the files listed in `themeEntries` plus
 *    `styles.css` and `styles-unlayered.css` (copy them from an existing theme);
 * 2. add `<name>` to `themes`;
 * 3. add the public exports to `packages/shoreline/package.json`
 *    (see `themeExports`).
 *
 * The contract test reports whatever is missing. This module is internal and is
 * not exported from the package.
 */
export const themes = ['sunrise', 'horizon'] as const

export type ThemeName = (typeof themes)[number]

/**
 * Theme selected by the `@vtex/shoreline/css*` entrypoints.
 */
export const defaultTheme: ThemeName = 'sunrise'

/**
 * Split entries of a theme. `input` is the source file inside the theme
 * directory, `output` the emitted file name (the unlayered variant gets an
 * `-unlayered` suffix) and `layer` the cascade layer wrapping the layered output.
 */
export const themeEntries = [
  { input: 'tokens.css', output: 'tokens', layer: 'sl-tokens' },
  { input: 'reset.css', output: 'reset', layer: 'sl-reset' },
  { input: 'base.css', output: 'base', layer: 'sl-base' },
  {
    input: 'components/index.css',
    output: 'components',
    layer: 'sl-components',
  },
] as const

/**
 * Complete entries: `styles.css` is emitted with the layer statement and every
 * part in its layer; `styles-unlayered.css` is emitted without layers.
 */
export const themeStyleEntries = ['styles.css', 'styles-unlayered.css'] as const

/**
 * Public `package.json` exports expected for a theme, mapped to the files the
 * build emits inside `dist/themes/<name>/`.
 */
export function themeExports(theme: ThemeName): Record<string, string> {
  const dist = `./dist/themes/${theme}`

  const result: Record<string, string> = {
    [`./themes/${theme}`]: `${dist}/styles.css`,
    [`./themes/${theme}/unlayered`]: `${dist}/styles-unlayered.css`,
  }

  for (const { output } of themeEntries) {
    result[`./themes/${theme}/${output}`] = `${dist}/${output}.css`
    result[`./themes/${theme}/${output}/unlayered`] =
      `${dist}/${output}-unlayered.css`
  }

  return result
}
