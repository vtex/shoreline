import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconWarningCircle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconWarningCircle(props, ref) {
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
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.25V10.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.2188C10.4315 14.2188 10.7812 13.869 10.7812 13.4375C10.7812 13.006 10.4315 12.6562 10 12.6562C9.56853 12.6562 9.21875 13.006 9.21875 13.4375C9.21875 13.869 9.56853 14.2188 10 14.2188Z"
        fill="currentColor"
      />
    </svg>
  )
})
