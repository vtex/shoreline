import { border as borderStyles } from '../values'

export const border = {
  neutral: borderStyles('gray20'),
  mainSelected: borderStyles('blue40', 2),
  positive: borderStyles('green30'),
  info: borderStyles('lightBlue30'),
  critical: borderStyles('red30'),
  warning: borderStyles('orange30'),
  disabled: borderStyles('gray40'),

  form: {
    neutral: borderStyles('gray30'),
    neutralHover: borderStyles('gray50'),
    neutralFocus: borderStyles('gray60'),
    neutralPressed: borderStyles('gray60'),
    neutralChecked: borderStyles('black'),
    neutralCheckedHover: borderStyles('gray60'),
    neutralCheckedPressed: borderStyles('gray50'),

    critical: borderStyles('red40'),
    criticalHover: borderStyles('red50'),
    criticalFocus: borderStyles('red60'),

    control: borderStyles('gray30'),
    controlHover: borderStyles('gray50'),
    controlChecked: borderStyles('blue40'),
    controlFocus: borderStyles('gray60'),
    controlCheckedHover: borderStyles('blue50'),
  },
}
