import { createStitches } from '@stitches/react'
import { bg } from './tokens/bg'
import { borderRadius } from './tokens/borderRadius'
import { fg } from './tokens/fg'
import { shadow } from './tokens/shadow'
import { sizes } from './tokens/sizes'
import { space } from './tokens/space'
import { transitions } from './tokens/transitions'
import { zIndices } from './tokens/zIndices'
import { typography } from './values/typography'
import { text } from './tokens/stitches-text'
import { bc } from './tokens/bc'

export const { css } = createStitches({
  theme: {
    colors: {
      ...generateStitchesTokens({ bg }),
      ...generateStitchesTokens({ fg }),
      ...generateStitchesTokens({ bc }),
    },
    shadows: generateStitchesTokens(shadow),
    space: generateStitchesTokens(space),
    sizes: generateStitchesTokens(sizes),
    zIndices: generateStitchesTokens(zIndices),
    transitions: generateStitchesTokens(transitions),
    radii: generateStitchesTokens(borderRadius),
    lineHeights: typography.lineHeight,
    letterSpacings: typography.letterSpacing,
    fontWeights: typography.fontWeight,
    fontSizes: typography.fontSize,
    fonts: typography.fontStack,
  },
  utils: {
    text: (value: keyof typeof text) => text[value],
  },
})

export type { CSS as CSSObject } from '@stitches/react'

export function generateStitchesTokens(tokens: Record<string, any>) {
  const stitches = {}

  transformTokens(tokens, '', stitches)

  return stitches
}

/**
 * Transforms a object nesting into a { kebab-case-key: [string | number] } object
 */
function transformTokens(
  currentValue: Record<string, any> | string,
  nestedKey: string,
  stitchesTokens: Record<string, string | number>
) {
  if (typeof currentValue !== 'object') {
    return
  }

  const keys = Object.keys(currentValue)

  for (const i in keys) {
    const key = keys[i]

    const accNestedKey = nestedKey ? `${nestedKey}-${key}` : `${key}`

    if (typeof currentValue[key] !== 'object') {
      stitchesTokens[accNestedKey] = currentValue[key]
    } else {
      transformTokens(currentValue[key], accNestedKey, stitchesTokens)
    }
  }
}
