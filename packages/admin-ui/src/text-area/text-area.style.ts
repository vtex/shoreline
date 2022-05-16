import * as inputStyle from '../text-input/text-input.style'
import { style } from '@vtex/admin-ui-core'

export const MAX_HEIGHT = 440

export const container = style({
  ...inputStyle.container,
  display: 'block',
  minHeight: '68px',
  maxHeight: `${MAX_HEIGHT}px`,
  resize: 'none',
  transition: 'snap',
})

export const containerVariants = inputStyle.containerVariants

export const input = style({
  ...inputStyle.input,
  resize: 'none',
  transition: 'snap',
})
