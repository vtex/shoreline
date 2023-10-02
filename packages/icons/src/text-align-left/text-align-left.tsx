import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextAlignLeft = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextAlignLeft(props, ref) {
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
        d="M2.375 5C2.375 4.58579 2.71079 4.25 3.125 4.25H16.875C17.2892 4.25 17.625 4.58579 17.625 5C17.625 5.41421 17.2892 5.75 16.875 5.75H3.125C2.71079 5.75 2.375 5.41421 2.375 5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.375 8.125C2.375 7.71079 2.71079 7.375 3.125 7.375H13.125C13.5392 7.375 13.875 7.71079 13.875 8.125C13.875 8.53921 13.5392 8.875 13.125 8.875H3.125C2.71079 8.875 2.375 8.53921 2.375 8.125Z"
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
        d="M2.375 14.375C2.375 13.9608 2.71079 13.625 3.125 13.625H13.125C13.5392 13.625 13.875 13.9608 13.875 14.375C13.875 14.7892 13.5392 15.125 13.125 15.125H3.125C2.71079 15.125 2.375 14.7892 2.375 14.375Z"
        fill="currentColor"
      />
    </svg>
  )
})
