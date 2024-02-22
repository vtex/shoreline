import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { forwardRef } from '@vtex/shoreline-utils'

import { Separator as BaseDivider } from '@ariakit/react'

/**
 * Divider line for separing content
 *
 * @example
 * <div>Content <Divider /> Content</div>
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  props,
  ref
) {
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
})

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  /**
   * Divider axis orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}
