import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { palette } from '@vtex/admin-ui-core'
import { jsx, tag } from '@vtex/admin-ui-react'

/**
 * Component to create a user avatar from a passed label
 * It shows the first letter capitalized in the center
 * @example
 * ```jsx
 * <Avatar label="label" />
 * ```
 */
export const Avatar = jsx('div')(
  {
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
        lightBlue: palette('lightBlue'),
        green: palette('green'),
        orange: palette('orange'),
        cyan: palette('cyan'),
        purple: palette('purple'),
        teal: palette('teal'),
        gray: palette('gray'),
      },
    },
  },
  {
    options: ['label'],
    useOptions: (options: AvatarOptions, props) => {
      const { label } = options
      const content = label?.charAt(0)

      return {
        ...props,
        children: <tag.div csx={{ text: '$body' }}>{content}</tag.div>,
      }
    },
  }
)

Avatar.defaultProps = {
  palette: 'lightBlue',
}

export interface AvatarOptions {
  label: string
}

export type AvatarProps = ComponentPropsWithRef<typeof Avatar> & AvatarOptions
