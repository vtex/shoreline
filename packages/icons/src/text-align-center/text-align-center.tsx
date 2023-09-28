import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextAlignCenter = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextAlignCenter(props, ref) {
  return (
    <svg
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
        d="M2.375 5C2.375 4.58579 2.71079 4.25 3.125 4.25H16.875C17.2892 4.25 17.625 4.58579 17.625 5C17.625 5.41421 17.2892 5.75 16.875 5.75H3.125C2.71079 5.75 2.375 5.41421 2.375 5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 8.125C4.25 7.71079 4.58579 7.375 5 7.375H15C15.4142 7.375 15.75 7.71079 15.75 8.125C15.75 8.53921 15.4142 8.875 15 8.875H5C4.58579 8.875 4.25 8.53921 4.25 8.125Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.375 11.25C2.375 10.8358 2.71079 10.5 3.125 10.5H16.875C17.2892 10.5 17.625 10.8358 17.625 11.25C17.625 11.6642 17.2892 12 16.875 12H3.125C2.71079 12 2.375 11.6642 2.375 11.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 14.375C4.25 13.9608 4.58579 13.625 5 13.625H15C15.4142 13.625 15.75 13.9608 15.75 14.375C15.75 14.7892 15.4142 15.125 15 15.125H5C4.58579 15.125 4.25 14.7892 4.25 14.375Z"
        fill="currentColor"
      />
    </svg>
  )
})
