import { style } from '@vtex/admin-ui-core'
import * as buttonStyle from '../button/button.style'

export const calendar = style({
  maxWidth: '19.75rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '$l',
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
  marginBottom: '$xl',
})

export const calendarButton = style({
  ...buttonStyle.buttonStyle,
  ...buttonStyle.variants({
    size: 'normal',
    variant: 'neutralTertiary',
  }),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const calendarCell = style({
  size: '2.25rem',
})

export const calendarCellButton = style({
  ...buttonStyle.buttonStyle,
  ...buttonStyle.variants({
    size: 'normal',
    variant: 'neutralTertiary',
  }),
  padding: 0,
  marginBottom: '$s',
  text: '$action1',
  border: 'none',
  cursor: 'pointer',
  size: '2.25rem',
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
  textAlign: 'center',
  size: '2.25rem',
})
