import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconMagnifyingGlass = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconMagnifyingGlass(props, ref) {
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
        d="M8.75 15C12.2018 15 15 12.2018 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1694 13.1694L17.4999 17.4999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
