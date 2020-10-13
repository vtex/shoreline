/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, Ref, ReactNode } from 'react'
import { Box as ReakitBox, BoxProps as ReakitBoxProps } from 'reakit'
import { RenderProp, ExtractHTMLAttributes } from 'reakit-utils/types'

import {
  styled,
  typographyTokens,
  flexTokens,
  gridTokens,
  layoutTokens,
  spaceTokens,
  colorTokens,
  borderTokens,
  sxTokens,
  positionTokens,
  variantToken,
  TypographyTokensProps,
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
  ColorTokensProps,
  BorderTokensProps,
  SxTokensProps,
  GridTokensProps,
  PositionTokensProps,
  VariantTokenProps,
} from '../../system'

const WrappedBox = forwardRef(function BoxWithEl(
  props: PropsWithEl,
  ref: Ref<any>
) {
  const { el = 'div', ...boxProps } = props

  return <ReakitBox as={el} ref={ref} {...boxProps} />
})

export const Box = styled(WrappedBox)<BoxProps>(
  variantToken,
  typographyTokens,
  flexTokens,
  layoutTokens,
  spaceTokens,
  colorTokens,
  borderTokens,
  gridTokens,
  positionTokens,
  sxTokens
)

export interface PropsWithEl extends Omit<ReakitBoxProps, 'sx' | 'variant'> {
  /**
   * Element type
   * @default 'div'
   * */
  el?: React.ElementType
  children?: ReactNode | RenderProp<ExtractHTMLAttributes<any>>
}

export type BoxProps = TypographyTokensProps &
  FlexTokensProps &
  LayoutTokensProps &
  SpaceTokensProps &
  ColorTokensProps &
  BorderTokensProps &
  SxTokensProps &
  GridTokensProps &
  PropsWithEl &
  PositionTokensProps &
  VariantTokenProps
