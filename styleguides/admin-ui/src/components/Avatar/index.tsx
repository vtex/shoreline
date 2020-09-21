import React from 'react'

import { Surface, SurfaceProps } from './styled'
import { Text } from '../Text'

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
export function Avatar(props: AvatarProps) {
  const { palette = 'base', sx = {}, label, ...containerProps } = props

  const firstLetter = label?.charAt(0)

  return (
    <Surface sx={{ variant: `avatar.${palette}`, ...sx }} {...containerProps}>
      <Text variant="highlight">{firstLetter}</Text>
    </Surface>
  )
}

export interface AvatarProps extends SurfaceProps {
  /**
   * String that will have its first letter capitalized
   */
  label: string
  /**
   * Avatar theme
   * @default base
   */
  palette?: 'base' | 'primary' | 'danger' | 'success'
}
