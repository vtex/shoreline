import styled from '@emotion/styled'
import { Box, BoxProps } from 'reakit'

import {
  flexTokens,
  layoutTokens,
  sxTokens,
  FlexTokensProps,
  LayoutTokensProps,
  SxTokensProps,
} from '../../tokens'

export const Flex = styled(Box)<FlexProps>(
  {
    display: 'flex',
  },
  flexTokens,
  layoutTokens,
  sxTokens
)

export type FlexProps = FlexTokensProps &
  LayoutTokensProps &
  SxTokensProps &
  Omit<BoxProps, 'as'>
