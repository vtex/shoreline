import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

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
  variant?: 'primary' | 'secondary'
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
  size?: 'normal' | 'large'
}
