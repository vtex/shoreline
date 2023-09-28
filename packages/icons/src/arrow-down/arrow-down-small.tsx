import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowDownSmall = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowDownSmall(props, ref) {
  return (
    <svg
      data-sl-icon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.53033 14.0303C8.23744 14.3232 7.76256 14.3232 7.46967 14.0303L2.96967 9.53033C2.67678 9.23744 2.67678 8.76256 2.96967 8.46967C3.26256 8.17678 3.73744 8.17678 4.03033 8.46967L7.25 11.6893L7.25 2.5C7.25 2.08579 7.58579 1.75 8 1.75C8.41421 1.75 8.75 2.08579 8.75 2.5L8.75 11.6893L11.9697 8.46967C12.2626 8.17678 12.7374 8.17678 13.0303 8.46967C13.3232 8.76256 13.3232 9.23744 13.0303 9.53033L8.53033 14.0303Z"
        fill="currentColor"
      />
    </svg>
  )
})
