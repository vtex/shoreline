import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconInfo = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconInfo(props, ref) {
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
        d="M9.375 9.375C9.54076 9.375 9.69973 9.44085 9.81694 9.55806C9.93415 9.67527 10 9.83424 10 10V13.125C10 13.2908 10.0658 13.4497 10.1831 13.5669C10.3003 13.6842 10.4592 13.75 10.625 13.75"
        fill="currentColor"
      />
      <path
        d="M9.375 9.375C9.54076 9.375 9.69973 9.44085 9.81694 9.55806C9.93415 9.67527 10 9.83424 10 10V13.125C10 13.2908 10.0658 13.4497 10.1831 13.5669C10.3003 13.6842 10.4592 13.75 10.625 13.75"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4062 6.5625C10.4062 6.95945 10.0845 7.28125 9.6875 7.28125C9.29055 7.28125 8.96875 6.95945 8.96875 6.5625C8.96875 6.16555 9.29055 5.84375 9.6875 5.84375C10.0845 5.84375 10.4062 6.16555 10.4062 6.5625Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="0.125"
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
