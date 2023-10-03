import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowRight = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowRight(props, ref) {
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
        d="M11.7803 3.84467C11.4874 3.55178 11.0126 3.55178 10.7197 3.84467C10.4268 4.13756 10.4268 4.61244 10.7197 4.90533L15.0643 9.25H3.125C2.71079 9.25 2.375 9.58579 2.375 10C2.375 10.4142 2.71079 10.75 3.125 10.75H15.0643L10.7197 15.0947C10.4268 15.3876 10.4268 15.8624 10.7197 16.1553C11.0126 16.4482 11.4874 16.4482 11.7803 16.1553L17.4053 10.5303C17.5518 10.3839 17.625 10.1919 17.625 10C17.625 9.89831 17.6048 9.80134 17.5681 9.71291C17.5315 9.62445 17.4772 9.54158 17.4053 9.46967L11.7803 3.84467Z"
        fill="currentColor"
      />
    </svg>
  )
})