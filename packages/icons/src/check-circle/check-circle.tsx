import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCheckCircle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCheckCircle(props, ref) {
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
        d="M6.875 10.625L8.75 12.5L13.125 8.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
