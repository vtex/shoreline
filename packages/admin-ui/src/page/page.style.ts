import { style, styleVariants } from '@vtex/admin-ui-core'

export const page = style({
  display: 'block',
  width: '100%',
})

export const pageHeader = style({
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

export const pageHeaderTop = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '95rem',
})

export const pageHeaderBottom = style({
  width: '100%',
  marginTop: '$l',
  marginBottom: '-1.55rem',
  '* > button': {
    minWidth: 'unset',
  },
  '> div': {
    paddingX: 'unset',
  },
  maxWidth: '95rem',
})

export const pageHeaderStart = style({
  display: 'flex',
  alignItems: 'center',
  minHeight: '2.75rem',
  '> div': {
    text: '$pageTitle',
  },
})

export const pageHeaderEnd = style({ display: 'flex', alignItems: 'center' })

export const pageHeaderTitle = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
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
  '> button': {
    minWidth: '6.5rem',
  },
  '> * + *': {
    marginLeft: '$l',
  },
})

export const pageHeaderTab = style({ padding: 3 })

export const pageHeaderTag = style({ marginLeft: '$m' })

export const pageContent = style({
  width: '100%',
  margin: 'auto',
  display: 'grid',
  gridGap: '1rem',
  paddingX: '1rem',
  '@desktop': {
    paddingX: '1.25rem',
  },
})

export const pageContentVariants = styleVariants({
  layout: {
    wide: {
      maxWidth: '95rem',
      paddingTop: '1rem',
      paddingBottom: '3rem',
    },
    standard: {
      maxWidth: '71rem',
      paddingTop: '1.5rem',
      paddingBottom: '5rem',
    },
    narrow: {
      maxWidth: '46rem',
      paddingTop: '3rem',
      paddingBottom: '8rem',
    },
  },
})
