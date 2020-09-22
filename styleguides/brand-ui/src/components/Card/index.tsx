/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Box, BoxProps, SxStyleProp } from 'theme-ui'
import React, { ReactNode } from 'react'
import { mergeSx } from '@vtex-components/theme'

function getCardVariant(
  noPadding: boolean,
  size: CardProps['size'] = 'regular'
) {
  if (noPadding) return 'card.noPadding'

  return `card.${size}`
}

const Header = ({ children, sx = {}, ...props }: BoxProps) => {
  const mergedSx = mergeSx<SxStyleProp>({ fontSize: 3 }, sx)

  return (
    <Box sx={mergedSx} {...props}>
      {children}
    </Box>
  )
}

const Body = ({ children, sx = {}, ...props }: BoxProps) => {
  const mergedSx = mergeSx<SxStyleProp>({ fontSize: 2 }, sx)

  return (
    <Box sx={mergedSx} {...props}>
      {children}
    </Box>
  )
}

const Footer = ({ children, sx = {}, ...props }: BoxProps) => {
  const mergedSx = mergeSx<SxStyleProp>({ fontSize: 2 }, sx)

  return (
    <Flex sx={mergedSx} {...props}>
      {children}
    </Flex>
  )
}

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
