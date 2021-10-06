import { create } from '@storybook/theming/create'
import { theme } from '@vtex/admin-ui'

const { colors, fonts, borderRadius } = theme

export default create({
  base: 'light',

  colorPrimary: theme.foreground.base,
  colorSecondary: theme.foreground.muted,

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: theme.borderColor.base,
  appBorderRadius: borderRadius[2],

  // Typography
  fontBase: fonts.sans,
  fontCode: fonts.code,

  // Text colors
  textColor: theme.foreground.base,
  textInverseColor: colors.white,

  // Toolbar default and active colors
  barTextColor: colors.white,
  barSelectedColor: colors.white,
  barBg: colors.black,

  // Form colors
  inputBg: 'white',
  inputBorder: theme.borderColor.base,
  inputTextColor: theme.foreground.base,
  inputBorderRadius: borderRadius.default,

  brandTitle: 'Admin UI',
  brandUrl: 'https://github.com/vtex/onda',
  brandImage: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
})
