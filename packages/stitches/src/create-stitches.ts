import { createStitches } from '@stitches/react'
import { constants } from '@vtex/shoreline-utils'

export const { getCssText, css, keyframes, globalCss } = createStitches({
  prefix: constants.dsPrefix,
})
