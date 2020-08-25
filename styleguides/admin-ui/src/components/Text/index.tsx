import React from 'react'
import { SxStyleProp } from 'theme-ui'

import { Box, BoxProps } from '../Box'

/**
 * Component that abstracts all text variants on the DS
 * It renders a h1 if variant === headline
 * It renders a h2 if variant === subtitle
 * It renders a div for other variants
 * @example
 * import { Text } from 'admin-ui'
 *
 * To use a variant:
 * <Text variant="small">A small text</Text>
 *
 * To render with a different tag:
 * <Text as="p" variant="body">Look, a paragraph</Text>
 */
export function Text({
  as = undefined,
  variant = 'body',
  sx,
  ...props
}: TextProps) {
  const tag = getTag(variant)
  const asProp: typeof as = as ?? tag

  return (
    <Box
      as={asProp}
      {...props}
      sx={{
        ...getTextSx(variant),
        ...sx,
      }}
    />
  )
}

function getTag(variant: TextVariant) {
  switch (variant) {
    case 'headline':
      return 'h1'

    case 'subtitle':
      return 'h2'

    default:
      return 'span'
  }
}

/**
 * Utility that returns the sx all existing text variants
 * You can use it to define the font style of containers
 * @example
 * import { Box, getTextSx } from 'admin-ui'
 *
 * <Box sx={getTextSx()}>
 *  Wow, this body style
 * </Box>
 *
 * <Box sx={getTextSx('highlight')}>
 *  And this one, has the highlight style
 * </Box>
 *
 * @param variant Text variant @default 'body'
 * @returns SxStyleProp with { color, lineHeight, fontWeight, fontSize }
 */
export function getTextSx(variant: TextVariant = 'body'): SxStyleProp {
  switch (variant) {
    case 'small':
      return {
        color: 'text',
        lineHeight: 'small',
        fontWeight: 'regular',
        fontSize: 0,
      }

    case 'body':
      return {
        color: 'text',
        lineHeight: 'body',
        fontWeight: 'regular',
        fontSize: 1,
      }

    case 'highlight':
      return {
        color: 'text',
        lineHeight: 'highlight',
        fontWeight: 'medium',
        fontSize: 1,
      }

    case 'action':
      return {
        color: 'text',
        lineHeight: 'action',
        fontWeight: 'medium',
        fontSize: 1,
        textTransform: 'uppercase',
      }

    case 'subtitle':
      return {
        color: 'text',
        lineHeight: 'subtitle',
        fontWeight: 'medium',
        fontSize: 2,
      }

    case 'headline':
      return {
        color: 'text',
        lineHeight: 'headline',
        fontWeight: 'medium',
        fontSize: 3,
      }

    default:
      return {}
  }
}

export type TextVariant =
  | 'small'
  | 'body'
  | 'highlight'
  | 'action'
  | 'subtitle'
  | 'headline'

export interface TextProps extends Omit<BoxProps, 'variant' | 'ref'> {
  variant?: TextVariant
}
