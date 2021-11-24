import { create } from '@storybook/theming/create'
import { theme } from '@vtex/admin-ui'

export default create({
  base: 'light',

  colorPrimary: theme.foreground.base,
  colorSecondary: theme.foreground.muted,

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: theme.borderColor.base,
  appBorderRadius: theme.borderRadius[2],

  // Typography
  fontBase: theme.fonts.sans,
  fontCode: theme.fonts.code,

  // Text colors
  textColor: theme.foreground.base,
  textInverseColor: 'white',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'white',
  barBg: 'black',

  // Form colors
  inputBg: 'white',
  inputBorder: theme.borderColor.base,
  inputTextColor: theme.foreground.base,
  inputBorderRadius: theme.borderRadius.default,

  brandTitle: 'Admin UI',
  brandUrl: 'https://github.com/vtex/onda',
  brandImage: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
})
