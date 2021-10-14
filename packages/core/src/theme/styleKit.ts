import { get } from '@vtex/admin-ui-util'
import { colors } from './shape'

import type { StyleProp } from '../runtime'

export type Tone =
  | 'main'
  | 'critical'
  | 'warning'
  | 'positive'
  | 'neutral'
  | 'info'

export type Palette =
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

export const paletteMap: Record<Tone, Palette> = {
  critical: 'red',
  warning: 'orange',
  positive: 'green',
  neutral: 'grey',
  info: 'lightBlue',
  main: 'blue',
}

function createStyleKit() {
  function ring(tone: Tone) {
    return `0rem 0rem 0rem 0.125rem ${get(colors, `${paletteMap[tone]}20`)}`
  }

  function palette(color: Palette): StyleProp {
    return {
      bg: get(colors, `${color}10`, ''),
      color: get(colors, `${color}60`, ''),
    }
  }

  function focusVisible(tone: Tone): StyleProp {
    return {
      ':focus:not([data-focus-visible-added])': {
        outline: 'none',
        boxShadow: 'none',
      },
      ':focus': {
        outline: 'none',
        boxShadow: `ring.${tone}`,
      },
    }
  }

  return {
    ring,
    palette,
    focusVisible,
  }
}

const { ring, palette, focusVisible } = createStyleKit()

export { ring, palette, focusVisible }
