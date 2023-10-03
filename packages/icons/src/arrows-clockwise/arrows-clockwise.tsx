import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowsClockwise = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowsClockwise(props, ref) {
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
        d="M16.9 8.1999C16.6 8.1999 16.4 8.0999 16.2 7.7999C16.2 7.7999 13.9 3.7999 10 3.7999C7.20005 3.7999 5.50005 5.3999 5.50005 5.4999C5.20005 5.7999 4.70005 5.7999 4.40005 5.4999C4.10005 5.1999 4.10005 4.6999 4.40005 4.3999C4.60005 4.3999 6.60005 2.3999 10 2.3999C14.8 2.3999 17.4 6.9999 17.5 7.1999C17.7 7.5999 17.6 7.9999 17.2 8.1999C17.1 8.1999 17 8.1999 16.9 8.1999Z"
        fill="currentColor"
      />
      <path
        d="M10 17.5999C5.20005 17.5999 2.60005 12.9999 2.50005 12.7999C2.30005 12.3999 2.40005 11.9999 2.80005 11.7999C3.20005 11.5999 3.60005 11.6999 3.80005 12.0999C3.80005 12.0999 6.10005 16.0999 10 16.0999C12.8 16.0999 14.5 14.4999 14.5 14.3999C14.8 14.0999 15.3 14.0999 15.6 14.3999C15.9001 14.6999 15.9001 15.1999 15.6 15.4999C15.4001 15.5999 13.4 17.5999 10 17.5999Z"
        fill="currentColor"
      />
      <path
        d="M16.9 8.1999L13.1 8.1999C12.7 8.1999 12.3 7.8999 12.3 7.3999C12.3 6.8999 12.6 6.5999 13.1 6.5999H16.1V3.5999C16.1 3.1999 16.4 2.7999 16.9 2.7999C17.4 2.7999 17.7 3.0999 17.7 3.5999V7.3999C17.6 7.8999 17.3 8.1999 16.9 8.1999Z"
        fill="currentColor"
      />
      <path
        d="M3.10005 16.9999C2.70005 16.9999 2.30005 16.6999 2.30005 16.1999V12.3999C2.30005 11.9999 2.60005 11.5999 3.10005 11.5999H6.90005C7.30005 11.5999 7.70005 11.8999 7.70005 12.3999C7.70005 12.8999 7.40005 13.1999 6.90005 13.1999H3.90005V16.1999C3.90005 16.6999 3.50005 16.9999 3.10005 16.9999Z"
        fill="currentColor"
      />
    </svg>
  )
})