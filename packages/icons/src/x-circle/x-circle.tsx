import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconXCircle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconXCircle(props, ref) {
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
        d="M10 3.25C6.27208 3.25 3.25 6.27208 3.25 10C3.25 13.7279 6.27208 16.75 10 16.75C13.7279 16.75 16.75 13.7279 16.75 10C16.75 6.27208 13.7279 3.25 10 3.25ZM1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.25 14.5563 14.5563 18.25 10 18.25C5.44365 18.25 1.75 14.5563 1.75 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0303 6.96967C13.3232 7.26256 13.3232 7.73744 13.0303 8.03033L8.03033 13.0303C7.73744 13.3232 7.26256 13.3232 6.96967 13.0303C6.67678 12.7374 6.67678 12.2626 6.96967 11.9697L11.9697 6.96967C12.2626 6.67678 12.7374 6.67678 13.0303 6.96967Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.96967 6.96967C7.26256 6.67678 7.73744 6.67678 8.03033 6.96967L13.0303 11.9697C13.3232 12.2626 13.3232 12.7374 13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L6.96967 8.03033C6.67678 7.73744 6.67678 7.26256 6.96967 6.96967Z"
        fill="currentColor"
      />
    </svg>
  )
})
