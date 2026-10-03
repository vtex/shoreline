const { resolve } = require('node:path')
const { discoverThemes } = require('../tools/design-system/theme-registry.cjs')

function getThemeStylesheet(
  theme = process.env.SHORELINE_THEME ?? 'sunrise',
  packageRoot = resolve(__dirname, '../packages/shoreline')
) {
  const themes = discoverThemes(resolve(packageRoot, '../..'))
  if (!themes.includes(theme)) {
    throw new Error(
      `Unknown SHORELINE_THEME: ${theme}. Available themes: ${themes.join(', ')}.`
    )
  }
  return resolve(packageRoot, `dist/themes/${theme}/styles.css`)
}

module.exports = { getThemeStylesheet }
