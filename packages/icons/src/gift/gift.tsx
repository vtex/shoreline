import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconGift = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconGift(props, ref) {
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
        d="M16.875 6.25H3.125C2.77982 6.25 2.5 6.52982 2.5 6.875V9.375C2.5 9.72018 2.77982 10 3.125 10H16.875C17.2202 10 17.5 9.72018 17.5 9.375V6.875C17.5 6.52982 17.2202 6.25 16.875 6.25Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 10V15.625C16.25 15.7908 16.1842 15.9497 16.0669 16.0669C15.9497 16.1842 15.7908 16.25 15.625 16.25H4.375C4.20924 16.25 4.05027 16.1842 3.93306 16.0669C3.81585 15.9497 3.75 15.7908 3.75 15.625V10"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.25V16.25"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8117 2.43849C14.5414 3.16818 14.5844 4.39631 13.8117 5.08068C12.4906 6.25021 10 6.25021 10 6.25021C10 6.25021 10 3.75959 11.1719 2.43849C11.8539 1.66584 13.082 1.70881 13.8117 2.43849Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.18825 2.43849C5.45856 3.16818 5.41559 4.39631 6.18825 5.08068C7.50934 6.25021 9.99997 6.25021 9.99997 6.25021C9.99997 6.25021 9.99997 3.75959 8.82809 2.43849C8.14606 1.66584 6.91794 1.70881 6.18825 2.43849Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
