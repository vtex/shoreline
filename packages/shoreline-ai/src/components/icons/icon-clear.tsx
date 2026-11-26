import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from '@vtex/shoreline'

/**
 * Material Symbols "clear" (outlined, weight 400), 12px.
 * Source: google/material-design-icons, Apache 2.0.
 * Package-internal: not exported from the barrel.
 */
export const IconClear = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconClear(props, ref) {
  return (
    <svg
      data-sl-icon-fill
      width="12"
      height="12"
      viewBox="0 -960 960 960"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path
        d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
        fill="currentColor"
      />
    </svg>
  )
})
