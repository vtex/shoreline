import {
  styled,
  sxTokens,
  SxTokensProps,
  positionTokens,
  PositionTokensProps,
  variantToken,
  VariantTokenProps,
} from '../../system'

export type SurfaceProps = SxTokensProps &
  PositionTokensProps &
  VariantTokenProps

export const Surface = styled.div<SurfaceProps>`
  ${variantToken}
  ${positionTokens}
  ${sxTokens}
`
