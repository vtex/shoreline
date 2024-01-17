import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconQuestion = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconQuestion(props, ref) {
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
        d="M10.7188 14.0625C10.7188 14.4595 10.397 14.7812 10 14.7812C9.60305 14.7812 9.28125 14.4595 9.28125 14.0625C9.28125 13.6655 9.60305 13.3438 10 13.3438C10.397 13.3438 10.7188 13.6655 10.7188 14.0625Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="0.125"
      />
      <path
        d="M10 11.25V10.625C11.3805 10.625 12.5 9.64531 12.5 8.4375C12.5 7.22969 11.3805 6.25 10 6.25C8.61953 6.25 7.5 7.22969 7.5 8.4375V8.75"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
