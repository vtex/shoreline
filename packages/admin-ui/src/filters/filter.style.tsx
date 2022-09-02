import { focusVisible, style, styleVariants } from '@vtex/admin-ui-core'

import * as buttonStyle from '../button/button.style'
import * as menuStyle from '../menu/menu.style'

export const disclosure = style({
  ...buttonStyle.buttonStyle,
  ...buttonStyle.variants({ size: 'normal' }),
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
})

export const caretIcon = (isOpen: boolean) =>
  style({
    marginLeft: '$s',
    svg: {
      margin: 0,
      transform: `rotate(${isOpen ? 0 : 180}deg)`,
    },
  })

export const option = style({
  display: 'flex',
  cursor: 'pointer',
  ...focusVisible('main'),
})

export const scrollableContainer = style({
  padding: '$l',
  maxHeight: 256,
  overflowY: 'auto',
})

export const list = style({
  marginY: '$m',
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
  marginBottom: 0,
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

export const visibilitySelectorItem = style({
  ...menuStyle.item,
  ...menuStyle.itemVariants({
    variant: 'neutral',
  }),

  justifyContent: 'space-between',

  svg: {
    marginRight: 0,
    marginLeft: '$m',
    size: '1.25rem',
  },
})

export const visibilitySelectorItemVariants = styleVariants({
  selected: {
    true: {
      color: `action.main.tertiary`,
      ':hover': {
        color: `action.main.tertiaryHover`,
        bg: `action.neutral.tertiaryHover`,
      },
      ':focus-visible:not(:active)': {
        color: `action.main.tertiaryHover`,
        bg: `action.neutral.tertiaryHover`,
      },
    },
  },
})
