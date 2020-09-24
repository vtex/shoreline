/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Box, BoxProps, Image as ReakitImage, ImageProps } from 'theme-ui'
import React, { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

const Header = ({ children, ...props }: BoxProps) => (
  <Box {...props} variant="card.header">
    {children}
  </Box>
)

const Body = ({ children, ...props }: BoxProps) => (
  <Box {...props} variant="card.body">
    {children}
  </Box>
)

const Image = forwardRef((props: ImageProps, ref: Ref<HTMLImageElement>) => (
  <ReakitImage {...props} ref={ref} />
))

const Footer = ({ children, ...props }: BoxProps) => (
  <Flex {...props} variant="card.footer">
    {children}
  </Flex>
)

export const Card = ({
  children,
  el = 'div',
  sx = {},
  size = 'regular',
  ...props
}: CardProps) => (
    <Flex {...props} variant={`card.${size}`} as={el} sx={sx}>
      {children}
    </Flex>
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
  children?: ReactNode
}

Card.Header = Header
Card.Footer = Footer
Card.Body = Body
Card.Image = Image
