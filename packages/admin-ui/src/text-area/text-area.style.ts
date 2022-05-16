import { style } from '@vtex/admin-ui-core'

export const MAX_HEIGHT = 440

export const container = style({
  display: 'block',
  minHeight: '68px',
  maxHeight: `${MAX_HEIGHT}px`,
  resize: 'none',
  transition: 'snap',
})

export const input = style({
  resize: 'none',
  transition: 'snap',
})
