import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPlus = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPlus(props, ref) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.375 10C2.375 9.58579 2.71079 9.25 3.125 9.25H16.875C17.2892 9.25 17.625 9.58579 17.625 10C17.625 10.4142 17.2892 10.75 16.875 10.75H3.125C2.71079 10.75 2.375 10.4142 2.375 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.375C10.4142 2.375 10.75 2.71079 10.75 3.125V16.875C10.75 17.2892 10.4142 17.625 10 17.625C9.58579 17.625 9.25 17.2892 9.25 16.875V3.125C9.25 2.71079 9.58579 2.375 10 2.375Z"
        fill="currentColor"
      />
    </svg>
  )
})