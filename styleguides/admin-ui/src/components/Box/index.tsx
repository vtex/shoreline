import styled from '@emotion/styled'
import { Box as ReakitBox, BoxProps as ReakitBoxProps } from 'reakit'

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

export const Box = styled(ReakitBox)<BoxProps>(
  {
    display: 'flex',
  },
  flexTokens,
  layoutTokens,
  spaceTokens,
  colorTokens,
  sxTokens
)

export type BoxProps = FlexTokensProps &
  LayoutTokensProps &
  SpaceTokensProps &
  ColorTokensProps &
  SxTokensProps &
  Omit<ReakitBoxProps, 'as'>
