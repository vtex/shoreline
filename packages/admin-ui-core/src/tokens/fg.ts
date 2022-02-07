import { colors } from '../values'

export const fg = {
  primary: colors.black,
  secondary: colors.gray40,
  disabled: colors.gray40,
  inverted: colors.white,
  positive: colors.green40,
  info: colors.lightBlue40,
  critical: colors.red40,
  warning: colors.orange40,

  action: {
    neutral: {
      tertiary: colors.black,
      tertiaryHover: colors.black,
      tertiaryPressed: colors.black,
    },
    main: {
      primary: colors.white,
      primaryHover: colors.white,
      primaryPressed: colors.white,

      secondary: colors.blue50,
      secondaryHover: colors.blue50,
      secondaryPressed: colors.blue50,

      tertiary: colors.blue40,
      tertiaryHover: colors.blue40,
      tertiaryPressed: colors.blue40,
      tertiarySelected: colors.blue40,
    },
    critical: {
      primary: colors.white,
      primaryHover: colors.white,
      primaryPressed: colors.white,

      secondary: colors.red50,
      secondaryHover: colors.red50,
      secondaryPressed: colors.red50,

      tertiary: colors.red40,
      tertiaryHover: colors.red40,
      tertiaryPressed: colors.red40,
      tertiarySelected: colors.red40,
    },
  },

  form: {
    neutral: colors.black,
    neutralChecked: colors.white,
  },
}
