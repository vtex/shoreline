import React from 'react'
import { mergeSx, useComponentSx } from '@vtex-components/theme'
import { SxStyleProp } from 'theme-ui'

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

  const componentStyles = useComponentSx('avatar', { palette })
  const styles = mergeSx<SxStyleProp>(componentStyles, sx)

  const capitalLetter = label?.charAt(0)?.toUpperCase()

  return (
    <Surface sx={styles} {...containerProps}>
      <Text variant="highlight">{capitalLetter}</Text>
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
  palette?: 'base' | 'primary' | 'danger'
}
