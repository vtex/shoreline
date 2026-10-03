const { lstatSync, readdirSync } = require('node:fs')
const { resolve, join } = require('node:path')

const themesPath = 'packages/shoreline/src/themes'
const entries = [
  { input: 'tokens.css', output: 'tokens', layer: 'sl-tokens' },
  { input: 'reset.css', output: 'reset', layer: 'sl-reset' },
  { input: 'base.css', output: 'base', layer: 'sl-base' },
  {
    input: 'components/index.css',
    output: 'components',
    layer: 'sl-components',
  },
]
const fullEntries = ['styles.css', 'styles-unlayered.css']

// A single directory-based registry. Shared inputs live outside this directory.
function discoverThemes(root) {
  const directory = resolve(root, themesPath)
  let current = resolve(root)
  for (const part of themesPath.split('/')) {
    current = join(current, part)
    if (lstatSync(current).isSymbolicLink())
      throw new Error(`Theme registry cannot contain symlinks: ${current}`)
  }
  const themes = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() || entry.isSymbolicLink())
    .map((entry) => {
      if (!entry.isDirectory() || !/^[a-z][a-z0-9-]*$/.test(entry.name))
        throw new Error(`Invalid theme directory: ${entry.name}`)
      return entry.name
    })
    .sort()
  if (!themes.length) throw new Error('No themes are registered')
  return themes
}

function themeExports(theme) {
  if (!/^[a-z][a-z0-9-]*$/.test(theme)) throw new Error('Invalid theme name')
  const result = {
    [`./themes/${theme}`]: `./dist/themes/${theme}/styles.css`,
    [`./themes/${theme}/unlayered`]: `./dist/themes/${theme}/styles-unlayered.css`,
  }
  for (const { output } of entries) {
    result[`./themes/${theme}/${output}`] =
      `./dist/themes/${theme}/${output}.css`
    result[`./themes/${theme}/${output}/unlayered`] =
      `./dist/themes/${theme}/${output}-unlayered.css`
  }
  return result
}

module.exports = {
  discoverThemes,
  entries,
  fullEntries,
  themesPath,
  themeExports,
}
