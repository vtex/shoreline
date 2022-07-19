import { style } from '@vtex/admin-ui-core'

export const card = style({
  bg: '$primary',
  color: '$primary',
  border: '$neutral',
  borderRadius: 'default',
  padding: '$xl',
  size: '100%',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
})

export const content = style({
  '.__admin-ui-card-nested-title': { text: '$title2' },
  size: '100%',
})
