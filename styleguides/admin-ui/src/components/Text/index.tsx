import React from 'react'
import { useComponentSx } from '@vtex-components/theme'

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
  const styles = useComponentSx('text', { variant })

  return (
    <Box
      as={asProp}
      {...props}
      sx={{
        ...styles,
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
