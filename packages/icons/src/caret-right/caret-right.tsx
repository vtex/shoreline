import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCaretRight = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCaretRight(props, ref) {
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
        d="M6.96967 3.21967C7.26256 2.92678 7.73744 2.92678 8.03033 3.21967L14.2803 9.46967C14.5732 9.76256 14.5732 10.2374 14.2803 10.5303L8.03033 16.7803C7.73744 17.0732 7.26256 17.0732 6.96967 16.7803C6.67678 16.4874 6.67678 16.0126 6.96967 15.7197L12.6893 10L6.96967 4.28033C6.67678 3.98744 6.67678 3.51256 6.96967 3.21967Z"
        fill="currentColor"
      />
    </svg>
  )
})
