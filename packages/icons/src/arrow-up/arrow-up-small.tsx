import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowUpSmall = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowUpSmall(props, ref) {
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
        d="M0.0625 0.0625H15.9375V15.9375H0.0625V0.0625Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="0.125"
      />
      <path
        d="M8 13.5V2.5"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 7L8 2.5L12.5 7"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
