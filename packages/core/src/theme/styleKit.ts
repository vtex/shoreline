import { get } from '@vtex/admin-ui-util'
import type { Palette, Tone } from './types'
import type { StyleProp } from '../runtime'
import { colors } from './colors'
import { paletteMap } from './types'
import type { ColorTokens } from '.'

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

  function color(token: ColorTokens) {
    return get(colors, token, '')
  }

  function listBoxItem(tone: 'main' | 'critical', selected = false) {
    return {
      bg: `listBoxItem.${tone}${selected ? 'Selected' : ''}`,
      color: `listBoxItem.${tone}${selected ? 'Selected' : ''}`,
      ':hover': {
        bg: `listBoxItem.${tone}Hover`,
        color: `listBoxItem.${tone}Hover`,
      },
      ':pressed': {
        bg: `listBoxItem.${tone}Pressed`,
        color: `listBoxItem.${tone}Pressed`,
      },
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
    color,
    listBoxItem,
    focusVisible,
  }
}

const { ring, palette, focusVisible, color, listBoxItem } = createStyleKit()

export { ring, palette, focusVisible, color, listBoxItem }
