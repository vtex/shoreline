import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconClockClockwise = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconClockClockwise(props, ref) {
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
        d="M10 6.25V10L13.125 11.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.375 8.125H17.5V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7188 14.9998C13.736 15.9272 12.5018 16.5444 11.1702 16.7743C9.83865 17.0042 8.46887 16.8366 7.23202 16.2925C5.99517 15.7483 4.94609 14.8518 4.21585 13.7148C3.48562 12.5779 3.10662 11.251 3.12621 9.89986C3.1458 8.54875 3.5631 7.23336 4.32599 6.11806C5.08887 5.00276 6.1635 4.137 7.41561 3.62896C8.66771 3.12091 10.0418 2.9931 11.3661 3.26151C12.6904 3.52991 13.9063 4.18263 14.8618 5.13809C15.7813 6.06934 16.5407 6.94747 17.5001 8.12481"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
