import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { avatarTheme, avatarContentTheme } from './avatar.css'

/**
 * Component to create a user avatar from a passed label
 * It shows the first letter capitalized in the center
 * @example
 * <Avatar label="label" />
 */
export const Avatar = forwardRef(function Avatar(
  props: AvatarProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    palette = 'lightBlue',
    className = '',
    label,
    children,
    ...divProps
  } = props

  const content = label?.charAt(0)

  return (
    <div
      ref={ref}
      className={cx(avatarTheme, className)}
      data-palette={palette}
      {...divProps}
    >
      <div className={avatarContentTheme}>{content}</div>
    </div>
  )
})

type AvatarPalette =
  | 'lightBlue'
  | 'green'
  | 'orange'
  | 'cyan'
  | 'purple'
  | 'teal'
  | 'gray'

type DivElement = ComponentPropsWithoutRef<'div'>

export interface AvatarProps extends DivElement {
  label: string
  palette?: AvatarPalette
}
