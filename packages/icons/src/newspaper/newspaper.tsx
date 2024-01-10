import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconNewspaper = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconNewspaper(props, ref) {
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
        d="M7.5 8.75H13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11.25H13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 15.625C2.83152 15.625 3.14946 15.4933 3.38388 15.2589C3.6183 15.0245 3.75 14.7065 3.75 14.375V5C3.75 4.83424 3.81585 4.67527 3.93306 4.55806C4.05027 4.44085 4.20924 4.375 4.375 4.375H16.875C17.0408 4.375 17.1997 4.44085 17.3169 4.55806C17.4342 4.67527 17.5 4.83424 17.5 5V14.375C17.5 14.7065 17.3683 15.0245 17.1339 15.2589C16.8995 15.4933 16.5815 15.625 16.25 15.625H2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 15.625C2.16848 15.625 1.85054 15.4933 1.61612 15.2589C1.3817 15.0245 1.25 14.7065 1.25 14.375V6.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
