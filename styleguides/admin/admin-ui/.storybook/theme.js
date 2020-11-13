import { create } from '@storybook/theming/create'
import { theme } from '@vtex/admin-ui-theme'

const { colors, borderRadius } = theme

export default create({
  base: 'light',

  colorPrimary: colors.primary.base,
  colorSecondary: colors.text.primary,

  // UI
  appBg: colors.background,
  appContentBg: colors.muted[3],
  appBorderColor: colors.muted[2],
  appBorderRadius: borderRadius[2],

  // Typography
  fontBase:
    '"VTEX Trust Variable", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  fontCode:
    '"Dank Mono", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Consolas", "Monaco", monospace',

  // Text colors
  textColor: colors.text.primary,
  textInverseColor: colors.background,

  // Toolbar default and active colors
  barTextColor: colors.background,
  barSelectedColor: colors.background,
  barBg: colors.text.primary,

  // Form colors
  inputBg: colors.background,
  inputBorder: colors.muted[2],
  inputTextColor: colors.text.primary,
  inputBorderRadius: borderRadius.default,

  brandTitle: 'Admin UI',
  brandUrl: 'https://github.com/vtex/onda',
  brandImage: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
})
