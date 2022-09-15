import { style } from '@vtex/admin-ui-core'

export const card = style({
  bg: '$primary',
  color: '$primary',
  border: '$neutral',
  borderRadius: 'default',
  padding: '$xl',
  size: '100%',
  boxSizing: 'border-box',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
  width: '100%',
})

export const content = style({
  '.__admin-ui-card-nested-title': { text: '$title2' },
  size: '100%',
})

export const title = style({
  text: '$title1',
})

export const image = style({
  absoluteSize: '1.25rem',
})
