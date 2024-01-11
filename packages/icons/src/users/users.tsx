import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconUsers = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconUsers(props, ref) {
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
        d="M0.799316 15.6252C1.42361 14.6653 2.27775 13.8766 3.28421 13.3305C4.29067 12.7845 5.41757 12.4985 6.5626 12.4985C7.70763 12.4985 8.83452 12.7845 9.84098 13.3305C10.8474 13.8766 11.7016 14.6653 12.3259 15.6252"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4375 12.5C14.5825 12.4993 15.7095 12.7849 16.716 13.3306C17.7225 13.8764 18.5767 14.6651 19.2008 15.625"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5625 12.5C8.80616 12.5 10.625 10.6812 10.625 8.4375C10.625 6.19384 8.80616 4.375 6.5625 4.375C4.31884 4.375 2.5 6.19384 2.5 8.4375C2.5 10.6812 4.31884 12.5 6.5625 12.5Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.929 4.66406C12.4847 4.44242 13.0825 4.34625 13.6797 4.38244C14.2769 4.41862 14.8587 4.58626 15.3836 4.87338C15.9085 5.16051 16.3635 5.56002 16.716 6.04337C17.0686 6.52672 17.3101 7.08198 17.4232 7.66948C17.5363 8.25698 17.5183 8.86221 17.3703 9.44192C17.2224 10.0216 16.9483 10.5615 16.5675 11.023C16.1868 11.4845 15.7088 11.8562 15.1677 12.1115C14.6266 12.3668 14.0358 12.4995 13.4375 12.5"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
