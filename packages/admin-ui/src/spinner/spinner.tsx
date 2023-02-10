import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { spinnerTheme, svgTheme } from './spinner.css'

/**
 * Spinner component
 * @example
 * <Spinner />
 */
export const Spinner = forwardRef(function Spinner(
  props: SpinnerProps,
  ref: Ref<SVGSVGElement>
) {
  const { className = '', size = 24, ...spinnerProps } = props

  return (
    <svg
      viewBox="0 0 50 50"
      width={size}
      height={size}
      ref={ref}
      className={cx(svgTheme, className)}
      {...spinnerProps}
    >
      <circle cx={25} cy={25} r={20} className={spinnerTheme} />
    </svg>
  )
})

type SvgWithoutChildren = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>

export interface SpinnerProps extends SvgWithoutChildren {
  size?: number
}
