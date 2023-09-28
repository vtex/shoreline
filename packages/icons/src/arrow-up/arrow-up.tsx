import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowUp = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowUp(props, ref) {
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
        d="M9.46967 2.59467C9.76256 2.30178 10.2374 2.30178 10.5303 2.59467L16.1553 8.21967C16.4482 8.51256 16.4482 8.98744 16.1553 9.28033C15.8624 9.57322 15.3876 9.57322 15.0947 9.28033L10.75 4.93566V16.875C10.75 17.2892 10.4142 17.625 10 17.625C9.58579 17.625 9.25 17.2892 9.25 16.875V4.93566L4.90533 9.28033C4.61244 9.57322 4.13756 9.57322 3.84467 9.28033C3.55178 8.98744 3.55178 8.51256 3.84467 8.21967L9.46967 2.59467Z"
        fill="currentColor"
      />
    </svg>
  )
})
