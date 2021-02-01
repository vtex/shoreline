import React, { forwardRef, Ref } from 'react'

import { Box } from '../Box'
import { Overridable } from '../../types'

/**
 * Component to create a user avatar from a passed label
 * It shows the first letter capitalized in the center
 * @example
 * ```jsx
 * <Avatar label="label" />
 * <Avatar label="label" palette="primary" />
 * <Avatar label="label" palette="danger" />
 * ```
 */
export const Avatar = forwardRef(function Avatar(
  props: AvatarProps,
  ref: Ref<HTMLDivElement>
) {
  const { palette = 'base', label, styleOverrides, ...htmlProps } = props

  return (
    <Box
      ref={ref}
      themeKey={{
        avatar: {
          palette,
        },
      }}
      styles={styleOverrides}
      {...htmlProps}
    >
      <Box styles={{ text: 'highlight' }}>{label?.charAt(0)}</Box>
    </Box>
  )
})

export interface AvatarProps extends Overridable {
  /**
   * String that will have its first letter capitalized
   */
  label: string
  /**
   * Avatar theme
   * @default base
   */
  palette?: 'base' | 'primary' | 'danger'
}
