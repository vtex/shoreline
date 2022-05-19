import * as inputStyle from '../text-input/text-input.style'
import { style } from '@vtex/admin-ui-core'
import {
  MAX_TEXT_AREA_HEIGHT,
  MIN_TEXT_AREA_HEIGHT,
} from './text-area-constants'

export const container = style({
  ...inputStyle.container,
  display: 'block',
  minHeight: `${MIN_TEXT_AREA_HEIGHT}px`,
  maxHeight: `${MAX_TEXT_AREA_HEIGHT}px`,
  resize: 'none',
  transition: 'snap',
})

export const containerVariants = inputStyle.containerVariants

export const input = style({
  ...inputStyle.input,
  display: 'block',
  text: '$body',
  resize: 'none',
  transition: 'snap',
})
