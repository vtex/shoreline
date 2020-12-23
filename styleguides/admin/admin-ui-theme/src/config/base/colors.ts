import { darken } from 'polished'

const semanticColors = {
  blue: '#2953B2',
  blueSecondary: '#DAE3F5',
  red: '#CB4242',
  redSecondary: '#FEDADA',
  yellow: '#FFBA52',
  yellowSecondary: '#F6E0BA',
  green: '#368369',
  greenSecondary: '#CEE8DE',
  black: '#323845',
  white: '#FFFFFF',
}

export default {
  dark: {
    primary: semanticColors.black,
    secondary: '#707685',
  },
  light: {
    primary: semanticColors.white,
    secondary: '#F4F6FB',
  },
  mid: {
    primary: '#898F9E',
    secondary: '#C4C5CA',
    tertiary: '#E0E2E7',
  },
  focus: '#8DB6FA',
  blue: {
    default: semanticColors.blue,
    hover: darken(0.08, semanticColors.blue),
    pressed: darken(0.16, semanticColors.blue),
    secondary: {
      default: semanticColors.blueSecondary,
      hover: darken(0.04, semanticColors.blueSecondary),
      pressed: darken(0.08, semanticColors.blueSecondary),
    },
  },
  red: {
    default: semanticColors.red,
    hover: darken(0.08, semanticColors.red),
    pressed: darken(0.16, semanticColors.red),
    secondary: {
      default: semanticColors.redSecondary,
      hover: darken(0.04, semanticColors.redSecondary),
      pressed: darken(0.08, semanticColors.redSecondary),
    },
  },
  yellow: {
    default: semanticColors.yellow,
    hover: darken(0.08, semanticColors.yellow),
    pressed: darken(0.16, semanticColors.yellow),
    secondary: {
      default: semanticColors.yellowSecondary,
      hover: darken(0.04, semanticColors.yellowSecondary),
      pressed: darken(0.08, semanticColors.yellowSecondary),
    },
  },
  green: {
    default: semanticColors.green,
    hover: darken(0.08, semanticColors.green),
    pressed: darken(0.16, semanticColors.green),
    secondary: {
      default: semanticColors.greenSecondary,
      hover: darken(0.04, semanticColors.greenSecondary),
      pressed: darken(0.08, semanticColors.greenSecondary),
    },
  },
}
