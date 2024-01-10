import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCheckSmall = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCheckSmall(props, ref) {
  return (
    <svg
      data-sl-icon-small
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path
        d="M2.3999 8.5L5.8999 12L13.8999 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
