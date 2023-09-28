import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowDown = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowDown(props, ref) {
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
        d="M10.5303 17.4053C10.2374 17.6982 9.76256 17.6982 9.46967 17.4053L3.84467 11.7803C3.55178 11.4874 3.55178 11.0126 3.84467 10.7197C4.13756 10.4268 4.61244 10.4268 4.90533 10.7197L9.25 15.0643V3.125C9.25 2.71079 9.58579 2.375 10 2.375C10.4142 2.375 10.75 2.71079 10.75 3.125V15.0643L15.0947 10.7197C15.3876 10.4268 15.8624 10.4268 16.1553 10.7197C16.4482 11.0126 16.4482 11.4874 16.1553 11.7803L10.5303 17.4053Z"
        fill="currentColor"
      />
    </svg>
  )
})
