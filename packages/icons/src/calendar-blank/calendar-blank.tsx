import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCalendarBlank = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCalendarBlank(props, ref) {
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
        d="M14.5 1.875C14.5 1.46079 14.1642 1.125 13.75 1.125C13.3358 1.125 13 1.46079 13 1.875V2.375H7V1.875C7 1.46079 6.66421 1.125 6.25 1.125C5.83579 1.125 5.5 1.46079 5.5 1.875V2.375H3.75C2.99061 2.375 2.375 2.99061 2.375 3.75V16.25C2.375 17.0094 2.99061 17.625 3.75 17.625H16.25C17.0094 17.625 17.625 17.0094 17.625 16.25V3.75C17.625 2.99061 17.0094 2.375 16.25 2.375H14.5V1.875ZM16.125 6.125V3.875H14.5V4.375C14.5 4.78921 14.1642 5.125 13.75 5.125C13.3358 5.125 13 4.78921 13 4.375V3.875H7V4.375C7 4.78921 6.66421 5.125 6.25 5.125C5.83579 5.125 5.5 4.78921 5.5 4.375V3.875H3.875V6.125H16.125ZM3.875 7.625H16.125V16.125H3.875V7.625Z"
        fill="currentColor"
      />
    </svg>
  )
})
