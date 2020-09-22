/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Box, BoxProps } from 'theme-ui'
import React, { ReactNode } from 'react'

function getCardVariant(
  noPadding: boolean,
  size: CardProps['size'] = 'regular'
) {
  if (noPadding) return 'card.noPadding'

  return `card.${size}`
}

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

const Footer = ({ children, ...props }: BoxProps) => (
  <Flex {...props} variant="card.body">
    {children}
  </Flex>
)

export const Card = ({
  children,
  noPadding = false,
  el = 'div',
  sx = {},
  size,
  ...props
}: CardProps) => {
  const variant = getCardVariant(noPadding, size)

  return (
    <Flex {...props} variant={variant} as={el} sx={sx}>
      {children}
    </Flex>
  )
}

export interface CardProps extends BoxProps {
  /**
   * Element type
   * @default 'div'
   * */
  el?: React.ElementType
  /**
   * Use the full size of the card
   * @default 'false'
   */
  noPadding?: boolean
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
