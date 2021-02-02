import { jsxs, createComponent } from '@vtex/admin-core'

import { Overridable } from '../../types'
import { Primitive, PrimitiveProps } from '../Primitive'

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
export const Avatar = createComponent(Primitive, useAvatar)

export function useAvatar(props: AvatarProps): PrimitiveProps<'div'> {
  const { palette = 'base', label, styleOverrides, ...primitiveProps } = props

  return {
    styles: styleOverrides,
    themeKey: {
      avatar: {
        palette,
      },
    },
    children: jsxs(
      Primitive,
      { styles: { text: 'highlight' } },
      label?.charAt(0)
    ),
    ...primitiveProps,
  }
}

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
