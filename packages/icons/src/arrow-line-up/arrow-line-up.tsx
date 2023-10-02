import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowLineUp = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowLineUp(props, ref) {
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
        d="M10 4.87524C10.4142 4.87524 10.75 5.21103 10.75 5.62524V17.5002C10.75 17.9145 10.4142 18.2502 10 18.2502C9.58579 18.2502 9.25 17.9145 9.25 17.5002V5.62524C9.25 5.21103 9.58579 4.87524 10 4.87524Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.46967 5.09491C9.76256 4.80202 10.2374 4.80202 10.5303 5.09491L16.1553 10.7199C16.4482 11.0128 16.4482 11.4877 16.1553 11.7806C15.8624 12.0735 15.3876 12.0735 15.0947 11.7806L10 6.6859L4.90533 11.7806C4.61244 12.0735 4.13756 12.0735 3.84467 11.7806C3.55178 11.4877 3.55178 11.0128 3.84467 10.7199L9.46967 5.09491Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.375 3.125C2.375 2.71079 2.71079 2.375 3.125 2.375H16.875C17.2892 2.375 17.625 2.71079 17.625 3.125C17.625 3.53921 17.2892 3.875 16.875 3.875H3.125C2.71079 3.875 2.375 3.53921 2.375 3.125Z"
        fill="currentColor"
      />
    </svg>
  )
})
