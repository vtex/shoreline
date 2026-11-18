import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from '@vtex/shoreline'

/** Material "arrow_upward", 16px. Package-internal: not exported from the barrel. */
export const IconArrowUpward = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowUpward(props, ref) {
  return (
    <svg
      data-sl-icon-fill
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path
        d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
        fill="currentColor"
      />
    </svg>
  )
})
