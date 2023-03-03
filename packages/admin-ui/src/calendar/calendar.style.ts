import { style } from '@vtex/admin-ui-core'
import * as buttonStyle from '../button/button.css'

export const calendar = style({
  maxWidth: '19.75rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '$space-4 $space-5',
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
  marginBottom: '$space-4',
})

export const calendarButton = style({
  text: '$action1',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  position: 'relative',
  height: '2.25rem',
  ...buttonStyle.action({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const calendarCell = style({
  size: '2.25rem',
})

export const calendarCellButton = style({
  position: 'relative',
  height: '2.25rem',
  ...buttonStyle.action({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  padding: '$space-0',
  marginBottom: '$space-05',
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
  paddingY: '$space-2',
  textAlign: 'center',
  size: '2.25rem',
})
