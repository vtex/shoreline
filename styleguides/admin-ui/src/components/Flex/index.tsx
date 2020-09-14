import styled from '@emotion/styled'
import { Box, BoxProps } from 'reakit'

import {
  flexTokens,
  layoutTokens,
  spaceTokens,
  sxTokens,
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
  SxTokensProps,
} from '../../tokens'

export const Flex = styled(Box)<FlexProps>(
  {
    display: 'flex',
  },
  flexTokens,
  layoutTokens,
  spaceTokens,
  sxTokens
)

export type FlexProps = FlexTokensProps &
  LayoutTokensProps &
  SpaceTokensProps &
  SxTokensProps &
  Omit<BoxProps, 'as'>
