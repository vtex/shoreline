import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconLinkSimple = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconLinkSimple(props, ref) {
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
        d="M7.5 12.5L12.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 5.94598L11.0984 3.60223C11.8036 2.90843 12.7544 2.52139 13.7437 2.52542C14.7329 2.52945 15.6805 2.92422 16.3801 3.62374C17.0796 4.32326 17.4743 5.27086 17.4784 6.26012C17.4824 7.24938 17.0954 8.20016 16.4016 8.90536L14.0531 11.2499"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.94598 8.75L3.60223 11.0984C2.90843 11.8036 2.52139 12.7544 2.52542 13.7437C2.52945 14.7329 2.92422 15.6805 3.62374 16.3801C4.32326 17.0796 5.27086 17.4743 6.26012 17.4784C7.24938 17.4824 8.20016 17.0954 8.90536 16.4016L11.2499 14.0531"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
