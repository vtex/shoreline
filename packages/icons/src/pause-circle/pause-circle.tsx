import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPauseCircle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPauseCircle(props, ref) {
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
        d="M10 3.25C6.27208 3.25 3.25 6.27208 3.25 10C3.25 13.7279 6.27208 16.75 10 16.75C13.7279 16.75 16.75 13.7279 16.75 10C16.75 6.27208 13.7279 3.25 10 3.25ZM1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.25 14.5563 14.5563 18.25 10 18.25C5.44365 18.25 1.75 14.5563 1.75 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.125 6.75C8.53921 6.75 8.875 7.08579 8.875 7.5V12.5C8.875 12.9142 8.53921 13.25 8.125 13.25C7.71079 13.25 7.375 12.9142 7.375 12.5V7.5C7.375 7.08579 7.71079 6.75 8.125 6.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.875 6.75C12.2892 6.75 12.625 7.08579 12.625 7.5V12.5C12.625 12.9142 12.2892 13.25 11.875 13.25C11.4608 13.25 11.125 12.9142 11.125 12.5V7.5C11.125 7.08579 11.4608 6.75 11.875 6.75Z"
        fill="currentColor"
      />
    </svg>
  )
})
