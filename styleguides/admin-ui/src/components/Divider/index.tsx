import styled from '@emotion/styled'
import Divider, { DividerProps as BaseProps } from '@vtex-components/divider'

import {
  spaceTokens,
  SpaceTokensProps,
  sxTokens,
  SxTokensProps,
} from '../../tokens'

export type DividerProps = Pick<BaseProps, 'orientation'> &
  Pick<SpaceTokensProps, 'm' | 'mt' | 'mb' | 'mr' | 'ml' | 'mx' | 'my'> &
  SxTokensProps

const StyledDivider = styled(Divider)<DividerProps>`
  ${spaceTokens}
  ${sxTokens}
`

export { StyledDivider as Divider }
