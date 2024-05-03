import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

/**
 * Tags differentiate items through a read-only text value in a colored bg. They can be secondary or primary, given their relevance to the main job.
 * @status stable
 * @example
 * <Tag>Short text</Tag>
 */
export const Tag = forwardRef<HTMLDivElement, TagProps>(
  function Tag(props, ref) {
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
  }
)

export interface TagOptions {
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

export type TagProps = TagOptions & ComponentPropsWithoutRef<'div'>
