import React from 'react'
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
 * <Text variant="small">A small text</Text>
 * <Text as="p" variant="body">Look, a paragraph</Text>
 * ```
 */
export function Text(props: TextProps) {
  const { el = undefined, variant = 'body', sx = {}, ...boxProps } = props
  const tag = getTag(variant)
  const element: typeof el = el ?? tag

  return (
    <Box
      el={element}
      {...boxProps}
      sx={{
        variant: `text.${variant}`,
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

export interface TextProps extends BoxProps {
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
