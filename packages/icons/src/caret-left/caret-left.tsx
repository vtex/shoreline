import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCaretLeft = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCaretLeft(props, ref) {
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
        d="M13.0303 3.21967C13.3232 3.51256 13.3232 3.98744 13.0303 4.28033L7.31066 10L13.0303 15.7197C13.3232 16.0126 13.3232 16.4874 13.0303 16.7803C12.7374 17.0732 12.2626 17.0732 11.9697 16.7803L5.71967 10.5303C5.42678 10.2374 5.42678 9.76256 5.71967 9.46967L11.9697 3.21967C12.2626 2.92678 12.7374 2.92678 13.0303 3.21967Z"
        fill="currentColor"
      />
    </svg>
  )
})
