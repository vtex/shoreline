import styled from '@emotion/styled'

import {
  sxTokens,
  SxTokensProps,
  positionTokens,
  PositionTokensProps,
} from '../../tokens'

export type SurfaceProps = SxTokensProps & PositionTokensProps

export const Surface = styled.div<SurfaceProps>`
  ${sxTokens}
  ${positionTokens}
`
