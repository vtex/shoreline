import { create } from '@storybook/theming/create'
import { theme } from '@vtex/admin-ui'

const { colors, borderRadius } = theme

export default create({
  base: 'light',

  colorPrimary: colors.blue.default,
  colorSecondary: colors.dark.primary,

  // UI
  appBg: colors.light.primary,
  appContentBg: colors.light.secondary,
  appBorderColor: colors.mid.tertiary,
  appBorderRadius: borderRadius[2],

  // Typography
  fontBase:
    '"VTEXTrustVF", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  fontCode:
    '"Dank Mono", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Consolas", "Monaco", monospace',

  // Text colors
  textColor: colors.dark.primary,
  textInverseColor: colors.light.primary,

  // Toolbar default and active colors
  barTextColor: colors.light.primary,
  barSelectedColor: colors.light.primary,
  barBg: colors.dark.primary,

  // Form colors
  inputBg: colors.light.primary,
  inputBorder: colors.mid.tertiary,
  inputTextColor: colors.dark.primary,
  inputBorderRadius: borderRadius.default,

  brandTitle: 'Admin UI',
  brandUrl: 'https://github.com/vtex/onda',
  brandImage: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
})
