import { style } from '@vtex/admin-ui-core'

export * from './table-row.styles'

export const baseline = style({
  display: 'table-header-group',
  color: '$secondary',
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
