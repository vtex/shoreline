import styled from '@emotion/styled'

import {
  sxTokens,
  SxTokensProps,
  positionTokens,
  PositionTokensProps,
  variantToken,
  VariantTokenProps,
} from '../../tokens'

export type SurfaceProps = SxTokensProps &
  PositionTokensProps &
  VariantTokenProps

export const Surface = styled.div<SurfaceProps>`
  ${variantToken}
  ${positionTokens}
  ${sxTokens}
`
