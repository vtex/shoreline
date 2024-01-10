import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowUUpLeft = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowUUpLeft(props, ref) {
  return (
    <svg
      data-sl-icon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path
        d="M6.25 10.625L2.5 6.875L6.25 3.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 15.625H13.125C14.2853 15.625 15.3981 15.1641 16.2186 14.3436C17.0391 13.5231 17.5 12.4103 17.5 11.25V11.25C17.5 10.6755 17.3868 10.1066 17.167 9.57575C16.9471 9.04496 16.6249 8.56266 16.2186 8.15641C15.8123 7.75015 15.33 7.42789 14.7992 7.20803C14.2684 6.98816 13.6995 6.875 13.125 6.875H2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
