import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconX = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<'svg'>>(
  function IconX(props, ref) {
    return (
      <svg
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
          d="M15.625 4.375L4.375 15.625"
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.625 15.625L4.375 4.375"
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)
