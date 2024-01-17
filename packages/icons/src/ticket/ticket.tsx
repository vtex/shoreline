import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTicket = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTicket(props, ref) {
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
        d="M7.5 4.375V15.625"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.875 13.0617C1.87497 12.9178 1.92473 12.7782 2.01585 12.6667C2.10696 12.5552 2.23383 12.4786 2.37494 12.45C2.93958 12.3346 3.44704 12.0278 3.81149 11.5814C4.17594 11.1349 4.375 10.5763 4.375 10C4.375 9.42369 4.17594 8.86508 3.81149 8.41864C3.44704 7.9722 2.93958 7.66536 2.37494 7.55C2.23383 7.52135 2.10696 7.4448 2.01585 7.33331C1.92473 7.22182 1.87497 7.08225 1.875 6.93826V5C1.875 4.83424 1.94085 4.67527 2.05806 4.55806C2.17527 4.44085 2.33424 4.375 2.5 4.375H17.5C17.6658 4.375 17.8247 4.44085 17.9419 4.55806C18.0592 4.67527 18.125 4.83424 18.125 5V6.93826C18.125 7.08225 18.0753 7.22182 17.9842 7.33331C17.893 7.4448 17.7662 7.52136 17.6251 7.55C17.0604 7.66536 16.553 7.97221 16.1885 8.41865C15.8241 8.86508 15.625 9.4237 15.625 10C15.625 10.5763 15.8241 11.1349 16.1885 11.5814C16.553 12.0278 17.0604 12.3346 17.6251 12.45C17.7662 12.4787 17.893 12.5552 17.9841 12.6667C18.0753 12.7782 18.125 12.9178 18.125 13.0617V15C18.125 15.1658 18.0592 15.3247 17.9419 15.4419C17.8247 15.5592 17.6658 15.625 17.5 15.625H2.5C2.33424 15.625 2.17527 15.5592 2.05806 15.4419C1.94085 15.3247 1.875 15.1658 1.875 15V13.0617Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
