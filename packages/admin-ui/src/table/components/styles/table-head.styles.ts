import { style, styleVariants } from '@vtex/admin-ui-core'

export * from './table-row.styles'

export const baseline = style({
  display: 'contents',
})

export const columnCell = style({
  position: 'sticky',
  top: '$space-0',
  color: '$secondary',
  background: '$primary',
  overflowX: 'clip',
  zIndex: 1,
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
  margin: '$space-1',
  minHeight: '0.75rem',
})

export const variant = styleVariants({
  hasVerticalScroll: {
    true: {
      '> div': {
        boxShadow: '$overlay.center',
      },
    },
    false: {
      '> div': {
        boxShadow: 'none',
      },
    },
  },
})
