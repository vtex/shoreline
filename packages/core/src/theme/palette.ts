import type { StyleProp } from '../runtime'
import { get } from '@vtex/admin-ui-util'
import { colors } from './shape'

type Palette =
  | 'blue'
  | 'red'
  | 'pink'
  | 'lightBlue'
  | 'green'
  | 'orange'
  | 'cyan'
  | 'purple'
  | 'teal'
  | 'grey'

function createPalette<C extends Record<string, any>>(colors: C) {
  return function palette(color: Palette): StyleProp {
    return {
      bg: get(colors, `${color}10`, ''),
      color: get(colors, `${color}60`, ''),
    }
  }
}

export const palette = createPalette(colors)
