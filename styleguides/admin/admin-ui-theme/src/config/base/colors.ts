import { darken } from 'polished'

const elementaryColors = {
  white: '#FFFFFF',
  blue: '#DAE3F5',
  purple: '#F4EFFF',
  yellow: '#FDE6C0',
  green: '#D6EFE5',
  red: '#FEE3E3',
  black: '#323845',
}

const semanticColors = {
  primary: '#2953B2',
  secondary: '#DAE3F5',
  danger: '#CB4242',
  dangerWashed: '#FEDADA',
  warning: '#FFBA52',
  warningWashed: '#F6E0BA',
  success: '#368369',
  successWashed: '#CEE8DE',
}

export default {
  ...elementaryColors,
  text: {
    primary: '#323845',
    secondary: '#707685',
  },
  background: '#FFFFFF',
  brand: '#F71963',
  muted: ['#898F9E', '#C4C5CA', '#E0E2E7', '#F4F6FB'],
  focus: '#8DB6FA',
  primary: {
    base: semanticColors.primary,
    hover: darken(0.08, semanticColors.primary),
    pressed: darken(0.16, semanticColors.primary),
    accent: '#FFFFFF',
  },
  secondary: {
    base: semanticColors.secondary,
    hover: darken(0.04, semanticColors.secondary),
    pressed: darken(0.08, semanticColors.secondary),
    accent: semanticColors.primary,
  },
  danger: {
    base: semanticColors.danger,
    hover: darken(0.08, semanticColors.danger),
    pressed: darken(0.16, semanticColors.danger),
    accent: '#FFFFFF',
    washed: {
      base: semanticColors.dangerWashed,
      hover: darken(0.04, semanticColors.dangerWashed),
      pressed: darken(0.08, semanticColors.dangerWashed),
      accent: semanticColors.danger,
    },
  },
  warning: {
    base: semanticColors.warning,
    hover: darken(0.08, semanticColors.warning),
    pressed: darken(0.16, semanticColors.warning),
    accent: '#FFFFFF',
    washed: {
      base: semanticColors.warningWashed,
      hover: darken(0.04, semanticColors.warningWashed),
      pressed: darken(0.08, semanticColors.warningWashed),
      accent: semanticColors.warning,
    },
  },
  success: {
    base: semanticColors.success,
    hover: darken(0.08, semanticColors.success),
    pressed: darken(0.16, semanticColors.success),
    accent: '#FFFFFF',
    washed: {
      base: semanticColors.successWashed,
      hover: darken(0.04, semanticColors.successWashed),
      pressed: darken(0.08, semanticColors.successWashed),
      accent: semanticColors.success,
    },
  },
}
