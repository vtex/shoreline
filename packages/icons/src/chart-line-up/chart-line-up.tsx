import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconChartLineUp = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconChartLineUp(props, ref) {
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
        d="M2.5 3C2.91421 3 3.25 3.33579 3.25 3.75V15.5H17.5C17.9142 15.5 18.25 15.8358 18.25 16.25C18.25 16.6642 17.9142 17 17.5 17H2.5C2.08579 17 1.75 16.6642 1.75 16.25V3.75C1.75 3.33579 2.08579 3 2.5 3Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1553 5.09467C16.4482 5.38756 16.4482 5.86244 16.1553 6.15533L10.5303 11.7803C10.2374 12.0732 9.76256 12.0732 9.46967 11.7803L7.5 9.81066L3.03033 14.2803C2.73744 14.5732 2.26256 14.5732 1.96967 14.2803C1.67678 13.9874 1.67678 13.5126 1.96967 13.2197L6.96967 8.21967C7.26256 7.92678 7.73744 7.92678 8.03033 8.21967L10 10.1893L15.0947 5.09467C15.3876 4.80178 15.8624 4.80178 16.1553 5.09467Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.75 5.625C11.75 5.21079 12.0858 4.875 12.5 4.875H15.625C16.0392 4.875 16.375 5.21079 16.375 5.625V8.75C16.375 9.16421 16.0392 9.5 15.625 9.5C15.2108 9.5 14.875 9.16421 14.875 8.75V6.375H12.5C12.0858 6.375 11.75 6.03921 11.75 5.625Z"
        fill="currentColor"
      />
    </svg>
  )
})
