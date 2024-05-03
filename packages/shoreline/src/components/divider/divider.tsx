import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'
import { Separator as BaseDivider } from '@ariakit/react'

/**
 * Creates distinction between sections in containers with constrained space or rows in a table.
 * @status stable
 * @example
 * <div>Content <Divider /> Content</div>
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  function Divider(props, ref) {
    const { orientation = 'horizontal', ...otherProps } = props

    return (
      <BaseDivider
        data-sl-divider
        data-orientation={orientation}
        orientation={orientation}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface DividerOptions {
  /**
   * Divider axis orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}

export type DividerProps = DividerOptions & ComponentPropsWithoutRef<'hr'>
