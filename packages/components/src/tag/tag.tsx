import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const Tag = forwardRef<HTMLDivElement, TagProps>(function Tag(
  props,
  ref
) {
  const { variant, size, children, ...otherProps } = props

  return (
    <div
      data-sl-tag
      data-variant={variant}
      data-size={size}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  )
})

export interface TagProps extends ComponentPropsWithoutRef<'div'> {
  variant?: string
  size?: string
}
