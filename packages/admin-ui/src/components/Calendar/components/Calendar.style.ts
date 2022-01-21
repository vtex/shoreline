import type { StyleProp } from '@vtex/admin-ui-core'
import * as buttonStyle from '../../Button/Button.style'

function css(csx: StyleProp): StyleProp {
  return csx
}

export const calendar = css({
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

export const calendarHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
})

export const calendarButton = css({
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

export const calendarCell = css({
  size: 32,
})

export const calendarCellButton = css({
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

export const calendarHeaderTitle = css({
  text: '$title1',
})

export const calendarDayTitle = css({
  text: '$body',
  textDecoration: 'none',
  color: '$secondary',
  paddingY: 2,
})
