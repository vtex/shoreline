import { style } from '@vtex/admin-ui-core'

export const card = style({
  bg: '$primary',
  color: '$primary',
  border: '$neutral',
  borderRadius: 'default',
  size: '100%',
  boxSizing: 'border-box',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$space-6 $space-7',
  width: '100%',
})

export const content = style({
  '.__admin-ui-card-nested-title': { text: '$title2' },
  padding: '$space-0 $space-7 $space-6',
  size: '100%',
})

export const title = style({
  text: '$title1',
})

export const image = style({
  absoluteSize: '1.25rem',
})
