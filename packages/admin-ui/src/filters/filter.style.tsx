import {
  csx,
  cx,
  focusVisible,
  style,
  styleVariants,
} from '@vtex/admin-ui-core'
import { buttonTheme } from '../button/button.css'

import * as menuStyle from '../menu/menu.style'

export const disclosure = style({
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  position: 'relative',
  padding: '$space-2 $space-3',
  height: '2.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  text: '$action2',
  bg: '$action.neutral.secondary',
  color: '$secondary',
  ':hover': {
    bg: '$action.neutral.secondaryHover',
    color: '$secondary',
  },
  ':active': {
    bg: '$action.neutral.secondaryPressed',
    color: '$secondary',
  },
})

export const disclosureVariants = styleVariants({
  open: {
    true: {
      bg: '$action.neutral.secondaryPressed',
      color: '$secondary',
    },
  },
})

export const caretIcon = (isOpen: boolean) =>
  csx({
    marginLeft: '$space-1',
    svg: {
      margin: '$space-0',
      transform: `rotate(${isOpen ? 0 : 180}deg)`,
    },
  })

export const option = style({
  display: 'flex',
  cursor: 'pointer',
  ...focusVisible('main'),
})

export const scrollableContainer = style({
  padding: '$space-4 $space-5',
  paddingTop: '$space-0',
  marginTop: '$space-4',
  maxHeight: 240,
  overflowY: 'auto',
})

export const list = style({
  marginY: '$space-1',
  '> *:not(:first-child)': {
    marginTop: '$space-4',
  },
})

export const disclosureStatusLabel = style({
  color: '$primary',
  marginLeft: '$space-1',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '300px',
})

export const searchboxVariants = styleVariants({
  error: {
    true: { marginBottom: '$space-0' },
  },
})

export const searchbox = style({
  margin: '$space-4 $space-5',
  marginBottom: '$space-0',
  order: -1,
  '> input': { minWidth: 'auto' },
  '& ~ .__admin-ui-filter-status': { minHeight: '16rem' },
})

export const statusLayout = style({ padding: '$space-4 $space-5' })

export const footer = (isScrollableLayout: boolean) =>
  style({
    borderTop: isScrollableLayout ? '$neutral' : 'none',
    padding: '$space-4 $space-5',
    paddingTop: isScrollableLayout ? undefined : '$space-0',
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
    marginRight: '$space-0',
    marginLeft: '$space-2',
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

export const visibilitySelectorMenuButtonTheme = cx(
  buttonTheme,
  csx({ display: 'flex', justifyContent: 'center', alignItems: 'center' })
)
