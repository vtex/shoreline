import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconHeart = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconHeart(props, ref) {
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
        d="M10 16.875C10 16.875 1.875 12.5 1.875 7.34375C1.875 6.22487 2.31947 5.15181 3.11064 4.36064C3.90181 3.56947 4.97487 3.125 6.09375 3.125C7.85859 3.125 9.37031 4.08672 10 5.625C10.6297 4.08672 12.1414 3.125 13.9062 3.125C15.0251 3.125 16.0982 3.56947 16.8894 4.36064C17.6805 5.15181 18.125 6.22487 18.125 7.34375C18.125 12.5 10 16.875 10 16.875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
