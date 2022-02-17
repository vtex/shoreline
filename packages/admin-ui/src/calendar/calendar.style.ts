import { style } from '@vtex/admin-ui-core'
import * as buttonStyle from '../components/Button/Button.style'

export const calendar = style({
  maxWidth: 300,
  display: 'flex',
  flexDirection: 'column',
  padding: 6,
  '[aria-disabled="true"]': {
    color: '$disabled',
    bg: 'transparent',
  },
  '[aria-selected] > button': {
    bg: '$action.main.primary',
    color: '$action.main.primary',
  },
})

export const calendarHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
})

export const calendarButton = style({
  ...buttonStyle.baseline,
  ...buttonStyle.regular({
    icon: 'only',
  }),
  ...buttonStyle.action({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const calendarCell = style({
  size: 32,
})

export const calendarCellButton = style({
  ...buttonStyle.baseline,
  ...buttonStyle.small({
    icon: 'only',
  }),
  ...buttonStyle.action({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  borderRadius: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const calendarHeaderTitle = style({
  text: '$title1',
})

export const calendarDayTitle = style({
  text: '$body',
  textDecoration: 'none',
  color: '$secondary',
  paddingY: 2,
})
