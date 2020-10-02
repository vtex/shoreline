import { create } from '@storybook/theming/create'
import { theme } from '../src/theme'

export default create({
  base: 'light',

  colorPrimary: theme.colors.primary.base,
  colorSecondary: theme.colors.secondary.base,

  // UI
  appBg: theme.colors.background,
  appContentBg: theme.colors.muted[4],
  appBorderColor: theme.colors.muted[3],
  appBorderRadius: theme.borderRadius[4],

  // Typography
  fontBase:
    '"VTEX Trust Variable", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  fontCode:
    '"Dank Mono", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Consolas", "Monaco", monospace',

  // Text colors
  textColor: theme.colors.text,
  textInverseColor: theme.colors.background,

  // Toolbar default and active colors
  barTextColor: theme.colors.background,
  barSelectedColor: theme.colors.background,
  barBg: theme.colors.text,

  // Form colors
  inputBg: theme.colors.background,
  inputBorder: theme.colors.muted[3],
  inputTextColor: theme.colors.text,
  inputBorderRadius: theme.borderRadius[3],

  brandTitle: 'Brand UI',
  brandUrl: 'https://github.com/vtex/onda',
  brandImage: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
})
