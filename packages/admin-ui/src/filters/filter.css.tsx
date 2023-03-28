import { csx, cx, dataAttr, focusVisible } from '@vtex/admin-ui-core'
import { buttonTheme, action as actionColorScheme } from '../button/button.css'

export const filterDisclosureTheme = csx({
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

  [dataAttr('open', 'true')]: {
    bg: '$action.neutral.secondaryPressed',
    color: '$secondary',
  },
})

export const caretIconTheme = csx({
  marginLeft: '$space-1',

  [dataAttr('open', 'true')]: {
    svg: { margin: '$space-0', transform: 'rotate(0deg)' },
  },
  [dataAttr('open', 'false')]: {
    svg: { margin: '$space-0', transform: 'rotate(180deg)' },
  },
})

export const filterPopoverTheme = csx({
  text: '$body',
  boxShadow: '$overlay.bottom',
  border: '$neutral',
  borderRadius: '$base',
  bg: '$primary',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '16rem',
  zIndex: '$z-4',
})

export const filterControlInputTheme = csx({
  display: 'flex',
  cursor: 'pointer',
  ...focusVisible('main'),
  '> input': {
    marginRight: '$space-2',
  },
})

export const filterListboxTheme = csx({
  padding: '$space-4 $space-5',
  paddingTop: '$space-0',
  marginTop: '$space-4',
  maxHeight: 240,
  overflowY: 'auto',
  display: 'none',

  [dataAttr('status', 'ready')]: { display: 'inline' },
})

export const filterListTheme = csx({
  marginY: '$space-1',
  '> *:not(:first-child)': {
    marginTop: '$space-4',
  },
})

export const appliedItemsLabelTheme = csx({ fg: '$primary' })

export const disclosureStatusLabelTheme = csx({
  marginX: '$space-1',
  color: '$primary',
  marginLeft: '$space-1',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '300px',
})

export const filterSearchboxTheme = csx({
  margin: '$space-4 $space-5',
  marginBottom: '$space-0',
  order: -1,
  '> input': { minWidth: 'auto' },
  '& ~ .__admin-ui-filter-status': { minHeight: '16rem' },
})

export const filterStatusTheme = csx({ padding: '$space-4 $space-5' })

export const filterGroupTheme = csx({
  display: 'flex',
  flexWrap: 'wrap',
  '> .__admin-ui-filter-disclosure:not(:first-child)': {
    marginLeft: '$space-2',
  },
})

export const filterFooterTheme = csx({
  padding: '$space-4 $space-5',
  display: 'flex',
  justifyContent: 'end',
  order: 999,
  [dataAttr('scrollable', 'true')]: {
    borderTop: '$neutral',
  },
  [dataAttr('scrollable', 'false')]: {
    borderTop: 'none',
    paddingTop: '$space-0',
  },
})

export const filterControlOptionTheme = csx({
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

  ...actionColorScheme({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  ':active': {
    color: '$action.neutral.tertiaryHover',
    bg: '$action.neutral.tertiaryHover',
  },

  justifyContent: 'space-between',

  svg: {
    marginRight: '$space-0',
    marginLeft: '$space-2',
    size: '1.25rem',
  },

  [dataAttr('selected', 'true')]: {
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
})

export const filterControlDisclosureTheme = cx(
  buttonTheme,
  csx({ display: 'flex', justifyContent: 'center', alignItems: 'center' })
)
