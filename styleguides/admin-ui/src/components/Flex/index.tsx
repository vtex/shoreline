import styled from '@emotion/styled'
import { Box, BoxProps } from 'reakit'

import {
  flexTokens,
  layoutTokens,
  spaceTokens,
  colorTokens,
  sxTokens,
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
  ColorTokensProps,
  SxTokensProps,
} from '../../tokens'

export const Flex = styled(Box)<FlexProps>(
  {
    display: 'flex',
  },
  flexTokens,
  layoutTokens,
  spaceTokens,
  colorTokens,
  sxTokens
)

export type FlexProps = FlexTokensProps &
  LayoutTokensProps &
  SpaceTokensProps &
  ColorTokensProps &
  SxTokensProps &
  Omit<BoxProps, 'as'>
