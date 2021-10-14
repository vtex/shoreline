import { get } from '@vtex/admin-ui-util'
import type { Palette, Tone } from './types'
import type { StyleProp } from '../runtime'
import { colors } from './colors'
import { paletteMap } from './types'

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
