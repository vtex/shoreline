import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextB = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextB(props, ref) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.875 3.75C4.875 3.33579 5.21079 3 5.625 3H10.9375C11.8823 3 12.7885 3.37533 13.4566 4.04343C14.1247 4.71153 14.5 5.61767 14.5 6.5625C14.5 7.46905 14.1545 8.33998 13.5363 8.9992C13.9331 9.18746 14.2986 9.44352 14.615 9.75996C15.3417 10.4867 15.75 11.4723 15.75 12.5C15.75 13.5277 15.3417 14.5133 14.615 15.24C13.8883 15.9667 12.9027 16.375 11.875 16.375H5.625C5.21079 16.375 4.875 16.0392 4.875 15.625V3.75ZM6.375 10.125V14.875H11.875C12.5049 14.875 13.109 14.6248 13.5544 14.1794C13.9998 13.734 14.25 13.1299 14.25 12.5C14.25 11.8701 13.9998 11.266 13.5544 10.8206C13.109 10.3752 12.5049 10.125 11.875 10.125H6.375ZM10.9375 8.625H6.375V4.5H10.9375C11.4845 4.5 12.0091 4.7173 12.3959 5.10409C12.7827 5.49089 13 6.01549 13 6.5625C13 7.10951 12.7827 7.63411 12.3959 8.02091C12.0091 8.4077 11.4845 8.625 10.9375 8.625Z"
        fill="currentColor"
      />
    </svg>
  )
})