import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCheckSmall = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCheckSmall(props, ref) {
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
        d="M14.4303 3.46967C14.7232 3.76256 14.7232 4.23744 14.4303 4.53033L6.43033 12.5303C6.13744 12.8232 5.66256 12.8232 5.36967 12.5303L1.86967 9.03033C1.57678 8.73744 1.57678 8.26256 1.86967 7.96967C2.16256 7.67678 2.63744 7.67678 2.93033 7.96967L5.9 10.9393L13.3697 3.46967C13.6626 3.17678 14.1374 3.17678 14.4303 3.46967Z"
        fill="currentColor"
      />
    </svg>
  )
})
