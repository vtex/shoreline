import React from 'react'
import { useComponentSx } from '@vtex-components/theme'
import { SxStyleProp } from 'theme-ui'

import { Box, BoxProps } from '../Box'

/**
 * The component that abstracts all text variants from admin's styleguide.
 * - It renders a h1 if variant === headline.
 * - It renders a h2 if variant === subtitle.
 * - It renders a span for other variants.
 * @example
 * ```jsx
 * import { Text } from `@vtex/admin-ui`
 *
 * // To use a variant:
 * <Text variant="small">A small text</Text>
 *
 * // To render with a different tag:
 * <Text as="p" variant="body">Look, a paragraph</Text>
 * ```
 */
export function Text({
  as = undefined,
  variant = 'body',
  sx = {},
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

export interface TextProps extends Pick<BoxProps, 'as' | 'children'> {
  /**
   * Text Variant
   * @default body
   */
  variant?: TextVariant
  /**
   * ThemeUI style prop
   */
  sx?: SxStyleProp
}
