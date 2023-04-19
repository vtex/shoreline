import { dataAttr, csx, negative } from '@vtex/admin-ui-core'
import { action as actionColorScheme } from '../button/button.css'

export const itemTheme = csx({
  display: 'flex',
  alignItems: 'center',
  text: '$action2',
  height: '2.25rem',
  paddingY: '$space-2',
  paddingX: '$space-2',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',

  '> div': {
    justifyContent: 'flex-start',
  },

  svg: {
    marginRight: '$space-2',
    size: '1.25rem',
  },

  [dataAttr('variant', 'critical')]: {
    ...actionColorScheme({
      tone: 'critical',
      variant: 'tertiary',
    }),
    ':active': {
      color: '$action.critical.tertiaryHover',
      bg: '$action.critical.tertiaryHover',
    },
  },
  [dataAttr('variant', 'neutral')]: {
    ...actionColorScheme({
      tone: 'neutral',
      variant: 'tertiary',
    }),
    ':active': {
      color: '$action.neutral.tertiaryHover',
      bg: '$action.neutral.tertiaryHover',
    },
  },
  [dataAttr('variant', 'disabled')]: {
    color: '$disabled',
  },
})

export const disabledItemWrapper = csx({
  cursor: 'not-allowed',
})

export const popoverContainerTheme = csx({
  marginY: '$space-1',
  minWidth: '9rem',
  borderRadius: '$base',
  bg: '$primary',
  border: '$neutral',
  boxShadow: '$overlay.center',
  zIndex: '$z-3',
})

export const popoverChildrenTheme = csx({
  marginY: '$space-1',
  display: 'flex',
  flexDirection: 'column',
  padding: '$space-2 $space-3',
})

export const dividerTheme = csx({
  marginY: '$space-2',
  marginX: negative('$space-3'),
  borderBottom: '$neutral',
  width: 'auto',
  outline: 'none',
})

export const buttonTheme = csx({
  text: '$action1',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  position: 'relative',
  [dataAttr({ size: 'normal', 'bleed-y': true })]: {
    marginY: negative('$space-2'),
  },
  [dataAttr({ size: 'large', 'bleed-y': true })]: {
    marginY: negative('$space-3'),
  },
  [dataAttr({ size: 'normal', 'bleed-x': true })]: {
    marginX: negative('$space-3'),
  },
  [dataAttr({ size: 'large', 'bleed-x': true })]: {
    marginX: negative('$space-4'),
  },
  [dataAttr('size', 'normal')]: {
    padding: '$space-2 $space-3',
    height: '2.25rem',
  },
  [dataAttr('size', 'large')]: {
    padding: '$space-3 $space-4',
    height: '2.75rem',
  },
  [dataAttr({ size: 'normal', custom: false })]: {
    paddingX: '$space-2',
  },
  [dataAttr({ size: 'large', custom: false })]: {
    paddingX: '$space-3',
  },
  // color
  [dataAttr({ variant: 'primary', open: false })]: actionColorScheme({
    tone: 'main',
    variant: 'primary',
  }),
  [dataAttr({ variant: 'primary', open: true })]: {
    color: 'action.main.primaryPressed',
    bg: 'action.main.primaryPressed',
  },
  [dataAttr({ variant: 'secondary', open: false })]: actionColorScheme({
    tone: 'main',
    variant: 'secondary',
  }),
  [dataAttr({ variant: 'secondary', open: true })]: {
    color: 'action.main.secondaryPressed',
    bg: 'action.main.secondaryPressed',
  },
  [dataAttr({ variant: 'tertiary', open: false })]: actionColorScheme({
    tone: 'main',
    variant: 'tertiary',
  }),
  [dataAttr({ variant: 'tertiary', open: true })]: {
    color: 'action.main.tertiaryPressed',
    bg: 'action.main.tertiaryPressed',
  },
  [dataAttr({ variant: 'neutralTertiary', open: false })]: actionColorScheme({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  [dataAttr({ variant: 'neutralTertiary', open: true })]: {
    color: 'action.neutral.tertiaryPressed',
    bg: 'action.neutral.tertiaryPressed',
  },
})

export const buttonInnerContainerTheme = csx({
  text: '$action1',
  [dataAttr('icon-position', 'start')]: {
    flexDirection: 'row',
    paddingRight: '$space-1',
  },
  [dataAttr('icon-position', 'end')]: {
    flexDirection: 'row-reverse',
    svg: {
      marginLeft: '$space-05',
    },
  },
})
