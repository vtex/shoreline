import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconListNumbers = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconListNumbers(props, ref) {
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
        d="M8.125 10H16.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10H16.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.125 5H16.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.125 15H16.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.375 8.125V3.125L3.125 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.625 16.2501H3.125L5.36563 13.2524C5.46726 13.1221 5.5415 12.9726 5.5839 12.8129C5.62629 12.6532 5.63595 12.4866 5.61231 12.3231C5.58867 12.1595 5.5322 12.0025 5.44631 11.8613C5.36042 11.7201 5.24687 11.5978 5.1125 11.5016C4.83867 11.3017 4.49804 11.2157 4.16212 11.2616C3.8262 11.3075 3.52113 11.4817 3.31094 11.7477C3.23187 11.8494 3.16914 11.9627 3.125 12.0837"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
