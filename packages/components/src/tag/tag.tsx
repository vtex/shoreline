import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * Tags are used to categorize or label items.
 *
 * @example
 * <Tag>Short text</Tag>
 */
export const Tag = forwardRef<HTMLDivElement, TagProps>(function Tag(
  props,
  ref
) {
  const {
    variant = 'primary',
    size = 'normal',
    color = 'gray',
    children,
    ...otherProps
  } = props

  return (
    <div
      data-sl-tag
      data-variant={variant}
      data-size={size}
      data-color={color}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  )
})

export interface TagProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Tag variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary'
  /**
   * Tag color
   * @default 'gray'
   */
  color?:
    | 'gray'
    | 'red'
    | 'teal'
    | 'purple'
    | 'pink'
    | 'green'
    | 'cyan'
    | 'blue'
    | 'orange'
    | 'yellow'
  /**
   * Tag size
   * @default 'normal'
   */
  size?: 'normal' | 'large'
}
