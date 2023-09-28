import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCornersIn = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCornersIn(props, ref) {
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
        d="M12.5 3C12.9142 3 13.25 3.33579 13.25 3.75V6.75H16.25C16.6642 6.75 17 7.08579 17 7.5C17 7.91421 16.6642 8.25 16.25 8.25H12.5C12.0858 8.25 11.75 7.91421 11.75 7.5V3.75C11.75 3.33579 12.0858 3 12.5 3Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 12.5C3 12.0858 3.33579 11.75 3.75 11.75H7.5C7.91421 11.75 8.25 12.0858 8.25 12.5V16.25C8.25 16.6642 7.91421 17 7.5 17C7.08579 17 6.75 16.6642 6.75 16.25V13.25H3.75C3.33579 13.25 3 12.9142 3 12.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.75 12.5C11.75 12.0858 12.0858 11.75 12.5 11.75H16.25C16.6642 11.75 17 12.0858 17 12.5C17 12.9142 16.6642 13.25 16.25 13.25H13.25V16.25C13.25 16.6642 12.9142 17 12.5 17C12.0858 17 11.75 16.6642 11.75 16.25V12.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 3C7.91421 3 8.25 3.33579 8.25 3.75V7.5C8.25 7.91421 7.91421 8.25 7.5 8.25H3.75C3.33579 8.25 3 7.91421 3 7.5C3 7.08579 3.33579 6.75 3.75 6.75H6.75V3.75C6.75 3.33579 7.08579 3 7.5 3Z"
        fill="currentColor"
      />
    </svg>
  )
})
