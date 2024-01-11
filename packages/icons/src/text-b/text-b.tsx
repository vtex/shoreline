import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextB = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextB(props, ref) {
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
        d="M5.625 9.375H11.875C12.7038 9.375 13.4987 9.70424 14.0847 10.2903C14.6708 10.8763 15 11.6712 15 12.5C15 13.3288 14.6708 14.1237 14.0847 14.7097C13.4987 15.2958 12.7038 15.625 11.875 15.625H5.625V3.75H10.9375C11.6834 3.75 12.3988 4.04632 12.9262 4.57376C13.4537 5.10121 13.75 5.81658 13.75 6.5625C13.75 7.30842 13.4537 8.02379 12.9262 8.55124C12.3988 9.07868 11.6834 9.375 10.9375 9.375"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
