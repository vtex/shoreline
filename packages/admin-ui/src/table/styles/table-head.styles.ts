import { style, styleVariants } from '@vtex/admin-ui-core'

export * from './table-row.styles'

export const baseline = style({
  position: 'sticky',
  top: 0,
  zIndex: 3,
  color: '$secondary',
  background: '$primary',
})

export const sortableContainer = style({
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    svg: {
      opacity: 1,
    },
  },
})

export const sortIndicator = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 1,
  minHeight: '0.75rem',
})

export const variant = styleVariants({
  hasVerticalScroll: {
    true: {
      boxShadow: '$overlay.center',
    },
    false: {
      boxShadow: 'none',
    },
  },
})
