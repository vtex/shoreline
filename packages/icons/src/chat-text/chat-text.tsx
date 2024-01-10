import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconChatText = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconChatText(props, ref) {
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
        d="M3.52734 17.9773C3.43631 18.0539 3.32531 18.1029 3.20739 18.1186C3.08947 18.1343 2.96952 18.116 2.86164 18.0659C2.75376 18.0157 2.66242 17.9359 2.59836 17.8356C2.5343 17.7354 2.50018 17.619 2.5 17.5V5C2.5 4.83424 2.56585 4.67527 2.68306 4.55806C2.80027 4.44085 2.95924 4.375 3.125 4.375H16.875C17.0408 4.375 17.1997 4.44085 17.3169 4.55806C17.4342 4.67527 17.5 4.83424 17.5 5V15C17.5 15.1658 17.4342 15.3247 17.3169 15.4419C17.1997 15.5592 17.0408 15.625 16.875 15.625H6.44531C6.29808 15.625 6.1556 15.6771 6.04297 15.7719L3.52734 17.9773Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8.75H12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11.25H12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
