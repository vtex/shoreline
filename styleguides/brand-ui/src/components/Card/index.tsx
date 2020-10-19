/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  BoxProps,
  Image as ThemeUIImage,
  ImageProps,
  SxStyleProp,
} from 'theme-ui'
import React, { Ref, PropsWithChildren } from 'react'
import { forwardRef } from '@vtex-components/utils'

const Header = (props: PropsWithChildren<BoxProps>) => (
  <Box {...props} variant="card.header" />
)

const Body = (props: PropsWithChildren<BoxProps>) => (
  <Box {...props} variant="card.body" />
)

const Image = forwardRef((props: ImageProps, ref: Ref<HTMLImageElement>) => (
  <ThemeUIImage {...props} ref={ref} />
))

const Footer = (props: PropsWithChildren<BoxProps>) => (
  <Box {...props} variant="card.footer" />
)

export const Card = ({
  el = 'div',
  sx = {},
  size = 'regular',
  ...props
}: PropsWithChildren<CardProps>) => (
  <Box {...props} variant={`card.${size}`} as={el} sx={sx} />
)

export interface CardProps extends BoxProps {
  /**
   * Element type
   * @default 'div'
   * */
  el?: React.ElementType
  /**
   * Card size
   * @default 'regular'
   */
  size?: 'small' | 'regular'
  sx?: SxStyleProp
}

Card.Header = Header
Card.Footer = Footer
Card.Body = Body
Card.Image = Image
