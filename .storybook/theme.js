import { create } from '@storybook/theming/create'

export default create({
  base: 'light',

  colorPrimary: 'black',
  colorSecondary: '#111',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'black',
  appBorderRadius: '4px',

  // Typography
  fontBase: 'sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'white',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'white',
  barBg: 'black',

  // Form colors
  inputBg: 'white',
  inputBorder: 'black',
  inputTextColor: 'black',
  inputBorderRadius: '4px',

  brandTitle: 'Admin UI',
  brandUrl: 'https://github.com/vtex/admin-ui',
  brandImage: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
})
