import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import './spinner.css'

export const Spinner = forwardRef(function Spinner(
  props: SpinnerProps,
  ref: Ref<HTMLDivElement>
) {
  const { size = 24, description, ...spinnerProps } = props

  return (
    <div
      data-sl-spinner
      aria-atomic="true"
      aria-live="assertive"
      ref={ref}
      {...spinnerProps}
    >
      <title>{description}</title>
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <circle cx={25} cy={25} r={20} />
      </svg>
    </div>
  )
})

export interface SpinnerProps extends ComponentPropsWithoutRef<'div'> {
  size?: number
  description: string
}
