import { colors } from '../values'

export const bg = {
  primary: colors.white,
  secondary: colors.gray05,
  disabled: colors.gray10,
  positive: colors.green10,
  critical: colors.red10,
  warning: colors.orange10,
  info: colors.lightBlue10,
  inverted: colors.black,
  overlay: colors.grayTransparent50,
  skeleton: `linear-gradient(90deg, ${colors.gray10}, ${colors.gray20}), ${colors.gray10}`,
  action: {
    neutral: {
      secondary: colors.gray05,
      secondaryHover: colors.gray10,
      secondaryPressed: colors.gray20,

      tertiary: 'transparent',
      tertiaryHover: colors.grayTransparent05,
      tertiaryPressed: colors.grayTransparent10,
    },
    main: {
      primary: colors.blue40,
      primaryHover: colors.blue50,
      primaryPressed: colors.blue60,

      secondary: colors.blue10,
      secondaryHover: colors.blue20,
      secondaryPressed: colors.blue30,

      tertiary: 'transparent',
      tertiaryHover: colors.blue05,
      tertiaryPressed: colors.blue10,
      tertiarySelected: colors.blue05,
    },
    critical: {
      primary: colors.red40,
      primaryHover: colors.red50,
      primaryPressed: colors.red60,

      secondary: colors.red10,
      secondaryHover: colors.red20,
      secondaryPressed: colors.red30,

      tertiary: 'transparent',
      tertiaryHover: colors.red05,
      tertiaryPressed: colors.red10,
      tertiarySelected: colors.red05,
    },
  },

  form: {
    neutral: 'transparent',
    neutralHover: colors.gray10,
    neutralPressed: colors.gray30,
    neutralChecked: colors.black,
    neutralCheckedHover: colors.gray60,
    neutralCheckedPressed: colors.gray50,
    neutralInactive: colors.gray30,
    neutralInactiveHover: colors.gray50,
    neutralInactivePressed: colors.gray60,
    neutralActive: colors.black,
    neutralActiveHover: colors.gray60,
    neutralActivePressed: colors.gray50,

    controlHover: 'transparent',
    controlChecked: colors.blue40,
    controlCheckedHover: colors.blue50,
    controlCheckedFocus: colors.blue50,
  },
}
