import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextUnderline = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextUnderline(props, ref) {
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
        d="M5 17.5H15"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.375 4.375V10.625C14.375 11.7853 13.9141 12.8981 13.0936 13.7186C12.2731 14.5391 11.1603 15 10 15C8.83968 15 7.72688 14.5391 6.90641 13.7186C6.08594 12.8981 5.625 11.7853 5.625 10.625V4.375"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
