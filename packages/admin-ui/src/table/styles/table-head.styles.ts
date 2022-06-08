import { style } from '@vtex/admin-ui-core'

export const baseline = style({
  display: 'table-header-group',
  color: '$secondary',
})

export const sortableContainer = style({
  display: 'flex',
  alignItems: 'center',
})

export const rowBaseline = style({
  display: 'table-row',
  bg: '$primary',
  textAlign: 'left',
})

export const sortIndicator = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 1,
  minHeight: '0.75rem',
})
