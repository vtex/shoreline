import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowLineDown = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowLineDown(props, ref) {
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
        d="M10 1.75C10.4142 1.75 10.75 2.08579 10.75 2.5V14.375C10.75 14.7892 10.4142 15.125 10 15.125C9.58579 15.125 9.25 14.7892 9.25 14.375V2.5C9.25 2.08579 9.58579 1.75 10 1.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.84467 8.21967C4.13756 7.92678 4.61244 7.92678 4.90533 8.21967L10 13.3143L15.0947 8.21967C15.3876 7.92678 15.8624 7.92678 16.1553 8.21967C16.4482 8.51256 16.4482 8.98744 16.1553 9.28033L10.5303 14.9053C10.2374 15.1982 9.76256 15.1982 9.46967 14.9053L3.84467 9.28033C3.55178 8.98744 3.55178 8.51256 3.84467 8.21967Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.375 16.875C2.375 16.4608 2.71079 16.125 3.125 16.125H16.875C17.2892 16.125 17.625 16.4608 17.625 16.875C17.625 17.2892 17.2892 17.625 16.875 17.625H3.125C2.71079 17.625 2.375 17.2892 2.375 16.875Z"
        fill="currentColor"
      />
    </svg>
  )
})
