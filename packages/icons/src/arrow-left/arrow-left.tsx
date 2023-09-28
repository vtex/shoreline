import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowLeft = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowLeft(props, ref) {
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
        d="M9.28033 3.84467C9.57322 4.13756 9.57322 4.61244 9.28033 4.90533L4.93566 9.25H16.875C17.2892 9.25 17.625 9.58579 17.625 10C17.625 10.4142 17.2892 10.75 16.875 10.75H4.93566L9.28033 15.0947C9.57322 15.3876 9.57322 15.8624 9.28033 16.1553C8.98744 16.4482 8.51256 16.4482 8.21967 16.1553L2.59467 10.5303C2.30178 10.2374 2.30178 9.76256 2.59467 9.46967L8.21967 3.84467C8.51256 3.55178 8.98744 3.55178 9.28033 3.84467Z"
        fill="currentColor"
      />
    </svg>
  )
})
