import { create } from '@storybook/theming/create'
import { theme } from '@vtex/admin-ui'

const { colors, fonts, borderRadius } = theme

export default create({
  base: 'light',

  colorPrimary: colors.foreground.base,
  colorSecondary: colors.foreground.muted,

  // UI
  appBg: colors.background.base,
  appContentBg: colors.background.muted,
  appBorderColor: colors.borderColor.base,
  appBorderRadius: borderRadius[2],

  // Typography
  fontBase: fonts.sans,
  fontCode: fonts.code,

  // Text colors
  textColor: colors.foreground.base,
  textInverseColor: colors.white,

  // Toolbar default and active colors
  barTextColor: colors.white,
  barSelectedColor: colors.white,
  barBg: colors.black,

  // Form colors
  inputBg: colors.background.base,
  inputBorder: colors.borderColor.base,
  inputTextColor: colors.foreground.base,
  inputBorderRadius: borderRadius.default,

  brandTitle: 'Admin UI',
  brandUrl: 'https://github.com/vtex/onda',
  brandImage: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
})
