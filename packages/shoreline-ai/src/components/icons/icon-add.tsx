import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from '@vtex/shoreline'

/** Material "add", 20px. Package-internal: not exported from the barrel. */
export const IconAdd = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconAdd(props, ref) {
  return (
    <svg
      data-sl-icon-fill
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
    </svg>
  )
})
