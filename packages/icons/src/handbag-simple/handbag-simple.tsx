import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconHandbagSimple = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconHandbagSimple(props, ref) {
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
        d="M16.3804 5.625H3.61947C3.46585 5.62498 3.31752 5.68112 3.20241 5.78285C3.0873 5.88458 3.01334 6.02488 2.99447 6.17734L1.88119 15.5523C1.87089 15.6403 1.87941 15.7295 1.90617 15.8139C1.93294 15.8983 1.97734 15.9761 2.03644 16.0421C2.09553 16.108 2.16797 16.1607 2.24896 16.1965C2.32995 16.2324 2.41763 16.2506 2.50619 16.25H17.4937C17.5823 16.2506 17.6699 16.2324 17.7509 16.1965C17.8319 16.1607 17.9044 16.108 17.9634 16.0421C18.0225 15.9761 18.0669 15.8983 18.0937 15.8139C18.1205 15.7295 18.129 15.6403 18.1187 15.5523L17.0054 6.17734C16.9865 6.02488 16.9126 5.88458 16.7975 5.78285C16.6824 5.68112 16.534 5.62498 16.3804 5.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 5.625V5C6.875 4.1712 7.20424 3.37634 7.79029 2.79029C8.37634 2.20424 9.1712 1.875 10 1.875C10.8288 1.875 11.6237 2.20424 12.2097 2.79029C12.7958 3.37634 13.125 4.1712 13.125 5V5.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
