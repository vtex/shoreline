import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconList = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconList(props, ref) {
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
        d="M2.375 10C2.375 9.58579 2.71079 9.25 3.125 9.25H16.875C17.2892 9.25 17.625 9.58579 17.625 10C17.625 10.4142 17.2892 10.75 16.875 10.75H3.125C2.71079 10.75 2.375 10.4142 2.375 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.375 5C2.375 4.58579 2.71079 4.25 3.125 4.25H16.875C17.2892 4.25 17.625 4.58579 17.625 5C17.625 5.41421 17.2892 5.75 16.875 5.75H3.125C2.71079 5.75 2.375 5.41421 2.375 5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.375 15C2.375 14.5858 2.71079 14.25 3.125 14.25H16.875C17.2892 14.25 17.625 14.5858 17.625 15C17.625 15.4142 17.2892 15.75 16.875 15.75H3.125C2.71079 15.75 2.375 15.4142 2.375 15Z"
        fill="currentColor"
      />
    </svg>
  )
})
