import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextAlignRight = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextAlignRight(props, ref) {
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
        d="M6.125 8.125C6.125 7.71079 6.46079 7.375 6.875 7.375H16.875C17.2892 7.375 17.625 7.71079 17.625 8.125C17.625 8.53921 17.2892 8.875 16.875 8.875H6.875C6.46079 8.875 6.125 8.53921 6.125 8.125Z"
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
        d="M6.125 14.375C6.125 13.9608 6.46079 13.625 6.875 13.625H16.875C17.2892 13.625 17.625 13.9608 17.625 14.375C17.625 14.7892 17.2892 15.125 16.875 15.125H6.875C6.46079 15.125 6.125 14.7892 6.125 14.375Z"
        fill="currentColor"
      />
    </svg>
  )
})
