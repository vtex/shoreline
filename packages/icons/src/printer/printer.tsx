import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPrinter = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPrinter(props, ref) {
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
        d="M5 6.25V3.125H15V6.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 11.875H5V16.875H15V11.875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13.75H1.875V7.5C1.875 6.80937 2.48125 6.25 3.22891 6.25H16.7711C17.5187 6.25 18.125 6.80937 18.125 7.5V13.75H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5625 9.0625C15.5625 9.54575 15.1707 9.9375 14.6875 9.9375C14.2043 9.9375 13.8125 9.54575 13.8125 9.0625C13.8125 8.57925 14.2043 8.1875 14.6875 8.1875C15.1707 8.1875 15.5625 8.57925 15.5625 9.0625Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.125"
      />
    </svg>
  )
})
