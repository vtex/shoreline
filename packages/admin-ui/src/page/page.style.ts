import { style, styleVariants } from '@vtex/admin-ui-core'

export const page = style({
  display: 'block',
  width: '100%',
})

export const pageHeaderViewportRef = style({
  height: '3rem',
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: -2147483638,
})

export const pageHeaderBase = style({
  bg: '$primary',
  color: '$primary',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderBottom: '$neutral',
  position: 'sticky',
  top: 0,
  minHeight: '5.75rem',
  paddingX: '2rem',
  paddingY: '1.5rem',
  zIndex: 999,
})

export const pageHeader = styleVariants({
  scrollOnTop: {
    true: {},
    false: {
      boxShadow: '$overlay.center',
    },
  },
})

export const pageHeaderTop = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '95rem',
  minHeight: '2.6875rem',
})

export const pageHeaderBottomBase = style({
  width: '100%',
  marginTop: '$l',
  '> div': {
    paddingX: 'unset',
  },
  maxWidth: '95rem',
})

export const pageHeaderBottom = styleVariants({
  tabs: {
    true: {
      marginBottom: '-1.5rem',
      '* > button': {
        minWidth: 'unset',
      },
    },
    false: {},
  },
})

export const pageHeaderTitleBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

export const pageHeaderTitle = style({
  text: '$pageTitle',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  '> div:first-of-type': {
    marginLeft: '0.75rem',
  },
})

export const popNavigationButton = style({
  marginRight: '0.5rem',
})

export const pageHeaderMenu = style({
  display: 'flex',
  '> button': { marginLeft: '0rem' },
})

export const pageHeaderActions = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  '> div': {
    display: 'flex',
  },
  '> button:not([aria-haspopup="menu"])': {
    minWidth: '6.5rem',
  },
  '> * + *': {
    marginLeft: '$l',
  },
})

export const pageContent = style({
  width: '100%',
  margin: 'auto',
  display: 'grid',
  gridGap: '1rem',
  paddingX: '1rem',
  '@desktop': {
    paddingX: '2rem',
  },
})

export const pageContentVariants = styleVariants({
  layout: {
    wide: {
      maxWidth: '99rem',
      paddingTop: '2rem',
      paddingBottom: '3rem',
    },
    standard: {
      maxWidth: '73rem',
      paddingTop: '2.5rem',
      paddingBottom: '5rem',
    },
    narrow: {
      maxWidth: '48rem',
      paddingTop: '3rem',
      paddingBottom: '8rem',
    },
  },
})
