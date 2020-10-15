/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Box, BoxProps, Image as ReakitImage, ImageProps } from 'theme-ui'
import React, { Ref, PropsWithChildren } from 'react'
import { forwardRef } from '@vtex-components/utils'

const Header = (props: PropsWithChildren<BoxProps>) => (
  <Box {...props} variant="card.header" />
)

const Body = (props: PropsWithChildren<BoxProps>) => (
  <Box {...props} variant="card.body" />
)

const Image = forwardRef((props: ImageProps, ref: Ref<HTMLImageElement>) => (
  <ReakitImage {...props} ref={ref} />
))

const Footer = (props: PropsWithChildren<BoxProps>) => (
  <Flex {...props} variant="card.footer" />
)

export const Card = ({
  el = 'div',
  sx = {},
  size = 'regular',
  ...props
}: PropsWithChildren<CardProps>) => (
    <Flex {...props} variant={`card.${size}`} as={el} sx={sx} />
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
}

Card.Header = Header
Card.Footer = Footer
Card.Body = Body
Card.Image = Image
