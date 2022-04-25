import { colors } from '../values'

export const fg = {
  primary: colors.black,
  secondary: colors.gray50,
  disabled: colors.gray40,
  inverted: colors.white,
  positive: colors.green40,
  info: colors.lightBlue40,
  critical: colors.red40,
  warning: colors.orange40,

  action: {
    neutral: {
      tertiary: colors.gray50,
      tertiaryHover: colors.gray60,
      tertiaryPressed: colors.black,
    },
    main: {
      primary: colors.white,
      primaryHover: colors.white,
      primaryPressed: colors.white,

      secondary: colors.blue40,
      secondaryHover: colors.blue50,
      secondaryPressed: colors.blue60,

      tertiary: colors.blue40,
      tertiaryHover: colors.blue50,
      tertiaryPressed: colors.blue60,
      tertiarySelected: colors.blue40,
    },
    critical: {
      primary: colors.white,
      primaryHover: colors.white,
      primaryPressed: colors.white,

      secondary: colors.red40,
      secondaryHover: colors.red50,
      secondaryPressed: colors.red60,

      tertiary: colors.red40,
      tertiaryHover: colors.red50,
      tertiaryPressed: colors.red60,
      tertiarySelected: colors.red40,
    },
  },

  form: {
    neutral: colors.black,
    neutralChecked: colors.white,
  },
}
