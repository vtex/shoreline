import { style, styleVariants } from '@vtex/admin-ui-core'

export const page = style({
  display: 'block',
  width: '100%',
})

export const pageHeader = style({
  bg: '$primary',
  color: '$primary',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  borderBottom: '$neutral',
  position: 'sticky',
  top: 0,
  height: '4.5rem',
  paddingX: 4,
  zIndex: 999,
})

export const pageTitle = style({
  display: 'flex',
  alignItems: 'center',
  '* + *': {
    marginLeft: 4,
  },
})

export const pageActions = style({
  display: 'flex',
  alignItems: 'center',
  '> * + *': {
    marginLeft: 4,
  },
})

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
