import React, { forwardRef, Ref } from 'react'
import { Box as ReakitBox } from 'reakit/Box'

import { createElement } from '../../system'
import { Box } from '../Box'
import { useComponent } from '../../hooks/useComponent'
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
  const { palette = 'base', label, ...containerProps } = props
  const firstLetter = label?.charAt(0)
  const avatarProps = useComponent({
    props: {
      ...containerProps,
      children: <Box styles={{ text: 'highlight' }}>{firstLetter}</Box>,
    },
    themeKey: `components.avatar.${palette}`,
  })

  return createElement({
    component: ReakitBox,
    element: 'div',
    htmlProps: avatarProps,
    ref,
  })
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
