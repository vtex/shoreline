/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Box, BoxProps, SxStyleProp } from 'theme-ui'
import React, { ReactNode } from 'react'
import { mergeSx } from '@vtex-components/theme'

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
  const mergedSx = mergeSx<SxStyleProp>(
    { fontSize: 2, width: '100%', justifyContent: 'space-between' },
    sx
  )

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
  ...props
}: CardProps) => {
  const mergedSx = mergeSx<SxStyleProp>(
    {
      bg: 'primary.contrast',
      flexDirection: 'column',
      paddingX: noPadding ? 0 : 5,
      paddingY: noPadding ? 0 : 6,
      borderRadius: 3,
      boxShadow: '0px 3px 9px rgba(61, 62, 64, 0.25)',
    },
    sx
  )

  return (
    <Flex {...props} as={el} sx={mergedSx}>
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
  children?: ReactNode
}

Card.Header = Header
Card.Footer = Footer
Card.Body = Body
