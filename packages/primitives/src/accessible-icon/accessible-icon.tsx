import type { ReactElement, ReactNode } from 'react'
import React, { Children, cloneElement, forwardRef } from 'react'

import { VisuallyHidden } from '../visually-hidden'

/**
 * Makes icons accessible by adding a label
 * @example
 * <AccessibleIcon>
 *  <svg {...} />
 * </AccessibleIcon>
 */
export const AccessibleIcon = forwardRef<HTMLDivElement, AccessibleIconProps>(
  function AccessibleIcon(props, ref) {
    const { children, label, ...rest } = props
    const child = Children.only(children)

    return (
      <>
        {cloneElement(child as ReactElement, {
          'data-sl-accessible-icon': true,
          'aria-hidden': true,
          focusable: false,
          ref,
          ...rest,
        })}
        <VisuallyHidden>{label}</VisuallyHidden>
      </>
    )
  }
)

export interface AccessibleIconProps {
  /**
   * Describe the icon
   */
  label: ReactNode
  /**
   * Children prop
   */
  children?: ReactNode
}
