import React from 'react'
import { jsx, tag, PropsWithAs } from '@vtex/onda-react'

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
export const Avatar = jsx.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: 2,
  borderRadius: 'circle',
  textTransform: 'uppercase',
  variants: {
    palette: {
      base: {
        bg: 'dark.primary',
        color: 'light.primary',
      },
      primary: {
        bg: 'blue',
        color: 'light.primary',
      },
      danger: {
        bg: 'red',
        color: 'light.primary',
      },
    },
  },
}, {
  options: ['label'],
  useOptions: (options: AvatarOptions) => {
    const { label } = options
    const content = label?.charAt(0)
    return {
      children: (
        <tag.div csx={{ text: 'highlight' }}>
          {content}
        </tag.div>
      )
    }
  }
})

Avatar.defaultProps = {
  palette: 'base'
}

interface AvatarOptions {
  label: string
}

export type AvatarProps = PropsWithAs<AvatarOptions, 'div'>
