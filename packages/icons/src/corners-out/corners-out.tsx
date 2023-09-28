import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCornersOut = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCornersOut(props, ref) {
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
        d="M12.375 3.75C12.375 3.33579 12.7108 3 13.125 3H16.25C16.6642 3 17 3.33579 17 3.75V6.875C17 7.28921 16.6642 7.625 16.25 7.625C15.8358 7.625 15.5 7.28921 15.5 6.875V4.5H13.125C12.7108 4.5 12.375 4.16421 12.375 3.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 12.375C4.16421 12.375 4.5 12.7108 4.5 13.125V15.5H6.875C7.28921 15.5 7.625 15.8358 7.625 16.25C7.625 16.6642 7.28921 17 6.875 17H3.75C3.33579 17 3 16.6642 3 16.25V13.125C3 12.7108 3.33579 12.375 3.75 12.375Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.25 12.375C16.6642 12.375 17 12.7108 17 13.125V16.25C17 16.6642 16.6642 17 16.25 17H13.125C12.7108 17 12.375 16.6642 12.375 16.25C12.375 15.8358 12.7108 15.5 13.125 15.5H15.5V13.125C15.5 12.7108 15.8358 12.375 16.25 12.375Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3.75C3 3.33579 3.33579 3 3.75 3H6.875C7.28921 3 7.625 3.33579 7.625 3.75C7.625 4.16421 7.28921 4.5 6.875 4.5H4.5V6.875C4.5 7.28921 4.16421 7.625 3.75 7.625C3.33579 7.625 3 7.28921 3 6.875V3.75Z"
        fill="currentColor"
      />
    </svg>
  )
})
