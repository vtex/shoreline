import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowUpRightSmall = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowUpRightSmall(props, ref) {
  return (
    <svg
      data-sl-icon-small
      width="16"
      height="16"
      viewBox="0 0 16 16"
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
        d="M4.75 4C4.75 3.58579 5.08579 3.25 5.5 3.25H12C12.4142 3.25 12.75 3.58579 12.75 4V10.5C12.75 10.9142 12.4142 11.25 12 11.25C11.5858 11.25 11.25 10.9142 11.25 10.5V5.81066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L10.1893 4.75H5.5C5.08579 4.75 4.75 4.41421 4.75 4Z"
        fill="currentColor"
      />
    </svg>
  )
})
