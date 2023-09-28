import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCheck = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCheck(props, ref) {
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
        d="M18.0303 5.09467C18.3232 5.38756 18.3232 5.86244 18.0303 6.15533L8.03033 16.1553C7.73744 16.4482 7.26256 16.4482 6.96967 16.1553L2.59467 11.7803C2.30178 11.4874 2.30178 11.0126 2.59467 10.7197C2.88756 10.4268 3.36244 10.4268 3.65533 10.7197L7.5 14.5643L16.9697 5.09467C17.2626 4.80178 17.7374 4.80178 18.0303 5.09467Z"
        fill="currentColor"
      />
    </svg>
  )
})
