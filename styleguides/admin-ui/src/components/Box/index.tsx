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
  sxTokens,
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
  ColorTokensProps,
  SxTokensProps,
} from '../../tokens'

interface PropsWithEl extends ReakitBoxProps {
  el?: React.ElementType
  children?: ReactNode | RenderProp<ExtractHTMLAttributes<any>>
}

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
  sxTokens
)

export type BoxProps = FlexTokensProps &
  LayoutTokensProps &
  SpaceTokensProps &
  ColorTokensProps &
  SxTokensProps &
  PropsWithEl
