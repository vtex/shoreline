import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconNotebook = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconNotebook(props, ref) {
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
        d="M8 8.75C8 8.33579 8.33579 8 8.75 8H13.75C14.1642 8 14.5 8.33579 14.5 8.75C14.5 9.16421 14.1642 9.5 13.75 9.5H8.75C8.33579 9.5 8 9.16421 8 8.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 11.25C8 10.8358 8.33579 10.5 8.75 10.5H13.75C14.1642 10.5 14.5 10.8358 14.5 11.25C14.5 11.6642 14.1642 12 13.75 12H8.75C8.33579 12 8 11.6642 8 11.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.875 3.875V16.125H16.125V3.875H3.875ZM2.375 3.75C2.375 2.99061 2.99061 2.375 3.75 2.375H16.25C17.0094 2.375 17.625 2.99061 17.625 3.75V16.25C17.625 17.0094 17.0094 17.625 16.25 17.625H3.75C2.99061 17.625 2.375 17.0094 2.375 16.25V3.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 2.375C6.66421 2.375 7 2.71079 7 3.125V16.875C7 17.2892 6.66421 17.625 6.25 17.625C5.83579 17.625 5.5 17.2892 5.5 16.875V3.125C5.5 2.71079 5.83579 2.375 6.25 2.375Z"
        fill="currentColor"
      />
    </svg>
  )
})
