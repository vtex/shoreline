import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCaretDown = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCaretDown(props, ref) {
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
        d="M3.21967 6.96967C3.51256 6.67678 3.98744 6.67678 4.28033 6.96967L10 12.6893L15.7197 6.96967C16.0126 6.67678 16.4874 6.67678 16.7803 6.96967C17.0732 7.26256 17.0732 7.73744 16.7803 8.03033L10.5303 14.2803C10.2374 14.5732 9.76256 14.5732 9.46967 14.2803L3.21967 8.03033C2.92678 7.73744 2.92678 7.26256 3.21967 6.96967Z"
        fill="currentColor"
      />
    </svg>
  )
})
