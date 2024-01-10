import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconLockKey = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconLockKey(props, ref) {
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
        d="M10 12.5C10.8629 12.5 11.5625 11.8004 11.5625 10.9375C11.5625 10.0746 10.8629 9.375 10 9.375C9.13706 9.375 8.4375 10.0746 8.4375 10.9375C8.4375 11.8004 9.13706 12.5 10 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5V14.375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 6.875H3.75C3.40482 6.875 3.125 7.15482 3.125 7.5V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V7.5C16.875 7.15482 16.5952 6.875 16.25 6.875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 6.875V4.375C6.875 3.5462 7.20424 2.75134 7.79029 2.16529C8.37634 1.57924 9.1712 1.25 10 1.25C10.8288 1.25 11.6237 1.57924 12.2097 2.16529C12.7958 2.75134 13.125 3.5462 13.125 4.375V6.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
