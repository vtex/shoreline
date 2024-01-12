import type { ReactElement, ReactNode } from 'react'
import React, { Children, cloneElement, forwardRef } from 'react'

import { VisuallyHidden } from '../visually-hidden'

/**
 * Makes icons accessible by adding a label
 * @example
 * <AccessibleIcon>
 *  <svg
 *     data-sl-icon
 *     width="20"
 *     height="20"
 *     viewBox="0 0 20 20"
 *     fill="none"
 *     xmlns="http://www.w3.org/2000/svg"
 *     aria-hidden
 *     focusable={false}
 *   >
 *     <path
 *       d="M5 6.875L1.25 10L5 13.125"
 *       stroke="currentColor"
 *       strokeWidth="1.5"
 *       strokeLinecap="round"
 *       strokeLinejoin="round"
 *     />
 *     <path
 *       d="M15 6.875L18.75 10L15 13.125"
 *       stroke="currentColor"
 *       strokeWidth="1.5"
 *       strokeLinecap="round"
 *       strokeLinejoin="round"
 *     />
 *     <path
 *       d="M12.5 3.125L7.5 16.875"
 *       stroke="currentColor"
 *       strokeWidth="1.5"
 *       strokeLinecap="round"
 *       strokeLinejoin="round"
 *     />
 *   </svg>
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
  children?: ReactNode
}
