import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import type { VariantProps } from '@vtex/admin-ui-core'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as style from './avatar.style'
import { Box } from '../../box'

/**
 * Component to create a user avatar from a passed label
 * It shows the first letter capitalized in the center
 * @example
 * ```jsx
 * <Avatar label="label" />
 * ```
 */
export const Avatar = createComponent<'div', AvatarOptions>((props) => {
  const { label, palette = 'lightBlue', ...restProps } = props
  const content = label?.charAt(0)

  return useElement('div', {
    baseStyle: {
      ...style.baseline,
      ...style.variants({ palette }),
    },
    ...restProps,
    children: <Box csx={{ text: '$action1' }}>{content}</Box>,
  })
})

export interface AvatarOptions extends VariantProps<typeof style.variants> {
  label: string
}

export type AvatarProps = ComponentPropsWithRef<typeof Avatar> & AvatarOptions
