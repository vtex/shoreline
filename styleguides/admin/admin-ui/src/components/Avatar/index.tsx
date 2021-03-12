import { jsxs, createComponent } from '@vtex/admin-core'

import { SystemComponent } from '../../types'
import { Primitive, PrimitiveProps } from '@vtex/admin-primitives'

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
  const { palette = 'base', label, csx, ...primitiveProps } = props

  return {
    csx: {
      themeKey: {
        avatar: {
          palette,
        },
      },
      ...csx,
    },
    children: jsxs(Primitive, { csx: { text: 'highlight' } }, label?.charAt(0)),
    ...primitiveProps,
  }
}

export interface AvatarProps extends SystemComponent {
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
