import type { ComponentPropsWithoutRef, Ref } from 'react'

import { tagTheme } from './tag.css'

import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

/**
 * Tags represent a status, or a common denominator. They make sections and entities quickly identifiable and searchable.
 *
 * @example
 * <Tag
 *   label="Here goes your label!"
 *   variant="red"
 * />
 */
export const Tag = forwardRef((props: TagProps, ref: Ref<HTMLDivElement>) => {
  const {
    variant = 'gray',
    size = 'normal',
    label,
    className = '',
    ...htmlProps
  } = props

  return (
    <div
      ref={ref}
      {...htmlProps}
      className={cx(tagTheme, className)}
      data-variant={variant}
      data-size={size}
    >
      {label}
    </div>
  )
})

type TagVariant =
  | 'gray'
  | 'red'
  | 'orange'
  | 'green'
  | 'lightBlue'
  | 'cyan'
  | 'purple'
  | 'teal'
  | 'pink'

type TagSize = 'normal' | 'large'

interface TagProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Tag Label
   */
  label: string
  variant?: TagVariant
  size?: TagSize
}
