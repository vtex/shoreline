import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconRows = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconRows(props, ref) {
  return (
    <svg
      data-sl-icon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.875 12V14.875H16.125V12H3.875ZM2.375 11.875C2.375 11.1156 2.99061 10.5 3.75 10.5H16.25C17.0094 10.5 17.625 11.1156 17.625 11.875V15C17.625 15.7594 17.0094 16.375 16.25 16.375H3.75C2.99061 16.375 2.375 15.7594 2.375 15V11.875Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.875 5.125V8H16.125V5.125H3.875ZM2.375 5C2.375 4.24061 2.99061 3.625 3.75 3.625H16.25C17.0094 3.625 17.625 4.24061 17.625 5V8.125C17.625 8.88439 17.0094 9.5 16.25 9.5H3.75C2.99061 9.5 2.375 8.88439 2.375 8.125V5Z"
        fill="currentColor"
      />
    </svg>
  )
})
