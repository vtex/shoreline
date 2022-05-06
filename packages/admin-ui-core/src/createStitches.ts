import { createStitches } from '@stitches/react'
import { bg } from './tokens/bg'
import { fg } from './tokens/fg'
import { border } from './tokens/border'
import { borderRadius } from './tokens/borderRadius'
import { sizes } from './tokens/sizes'
import { space } from './tokens/space'
import { zIndices } from './tokens/zIndices'
import { transitions } from './tokens/transitions'
import { shadows } from './tokens/shadows'

export const { css, globalCss } = createStitches({
  theme: {
    colors: {
      ...bg,
      ...fg,
    },
    borderStyles: border,
    radii: borderRadius,
    sizes,
    shadows,
    space,
    zIndices,
    transitions,
  },
})

export { CSS as CSSObject } from '@stitches/react'
