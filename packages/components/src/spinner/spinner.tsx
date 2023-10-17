import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { spinnerStyle } from './spinner.css'

const DEFAULT_SIZE = 16
const DEFAULT_DESCRIPTION = 'loading'

/**
 * Loading indicator
 * @example
 * <Spinner description="loading" size={16} />
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(props, ref) {
    const {
      size = DEFAULT_SIZE,
      description = DEFAULT_DESCRIPTION,
      className,
      ...spinnerProps
    } = props

    return (
      <div
        ref={ref}
        className={cx(spinnerStyle, className)}
        data-sl-spinner
        aria-atomic="true"
        aria-live="assertive"
        {...spinnerProps}
      >
        <title>{description}</title>
        <svg viewBox="0 0 50 50" width={size} height={size}>
          <circle cx={25} cy={25} r={20} />
        </svg>
      </div>
    )
  }
)

export interface SpinnerProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Specify a description that would be used to best describe the loading state
   * @default 'loading'
   */
  description?: string
  /**
   * Increase or decrease the size of the shape
   * @default 16
   */
  size?: number
}
