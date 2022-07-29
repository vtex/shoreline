import { focusVisible, style, styleVariants } from '@vtex/admin-ui-core'

import * as buttonStyle from '../button/button.style'

export const disclosure = style({
  ...buttonStyle.buttonStyle,
  ...buttonStyle.variants({ size: 'normal' }),
  marginRight: '$m',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  text: '$action2',
  bg: '$action.neutral.secondary',
  color: '$secondary',
  padding: '$s',
  ':hover': {
    bg: '$action.neutral.secondaryHover',
    color: '$secondary',
  },
  ':active': {
    bg: '$action.neutral.secondaryPressed',
    color: '$secondary',
  },
  svg: {
    marginLeft: '$xs',
  },
})

export const caretIcon = (isOpen: boolean) =>
  style({
    transform: `rotate(${isOpen ? 0 : 180}deg)`,
    marginLeft: '$s',
  })

export const option = style({
  display: 'flex',
  cursor: 'pointer',
  ...focusVisible('main'),
})

export const scrollableContainer = style({
  padding: '$l',
  maxHeight: 312,
  overflowY: 'auto',
})

export const list = style({
  '> *:not(:first-child)': {
    marginTop: '$xl',
  },
})

export const disclosureStatusLabel = style({
  color: '$primary',
  marginLeft: '$s',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '300px',
})

export const searchboxVariants = styleVariants({
  error: {
    true: { marginBottom: 0 },
  },
})

export const searchbox = style({
  margin: '$l',
  order: -1,
  '& ~ .__admin-ui-filter-status': { minHeight: '16rem' },
})

export const statusLayout = style({ padding: '$l' })

export const footer = (isScrollableLayout: boolean) =>
  style({
    borderTop: isScrollableLayout ? '$neutral' : 'none',
    padding: '$l',
    paddingTop: isScrollableLayout ? undefined : 0,
    display: 'flex',
    justifyContent: 'end',
    order: 999,
  })
