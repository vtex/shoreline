/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, Ref, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Box as ReakitBox, BoxProps as ReakitBoxProps } from 'reakit'
import { RenderProp, ExtractHTMLAttributes } from 'reakit-utils/types'

import {
  flexTokens,
  layoutTokens,
  spaceTokens,
  colorTokens,
  borderTokens,
  sxTokens,
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
  ColorTokensProps,
  BorderTokensProps,
  SxTokensProps,
} from '../../tokens'

const WrappedBox = forwardRef(function BoxWithEl(
  props: PropsWithEl,
  ref: Ref<any>
) {
  const { el = 'div', ...boxProps } = props

  return <ReakitBox as={el} ref={ref} {...boxProps} />
})

export const Box = styled(WrappedBox)<BoxProps>(
  flexTokens,
  layoutTokens,
  spaceTokens,
  colorTokens,
  borderTokens,
  sxTokens
)

export interface PropsWithEl extends Omit<ReakitBoxProps, 'sx'> {
  /**
   * Element type
   * @default 'div'
   * */
  el?: React.ElementType
  children?: ReactNode | RenderProp<ExtractHTMLAttributes<any>>
}

export type BoxProps = FlexTokensProps &
  LayoutTokensProps &
  SpaceTokensProps &
  ColorTokensProps &
  BorderTokensProps &
  SxTokensProps &
  PropsWithEl
