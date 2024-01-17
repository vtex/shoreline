import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCloudArrowUp = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCloudArrowUp(props, ref) {
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
        d="M7.49997 16.25H5.62497C5.00463 16.2492 4.39154 16.1166 3.82639 15.8608C3.26124 15.605 2.75694 15.2319 2.34697 14.7663C1.937 14.3008 1.63072 13.7534 1.44846 13.1604C1.2662 12.5674 1.21213 11.9425 1.28983 11.327C1.36753 10.7116 1.57522 10.1197 1.89913 9.5906C2.22305 9.06153 2.65577 8.6074 3.16859 8.25834C3.6814 7.90928 4.26259 7.67326 4.87358 7.56595C5.48458 7.45864 6.1114 7.4825 6.71247 7.63593"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 10C6.25 9.00968 6.48533 8.03353 6.9366 7.152C7.38788 6.27047 8.04217 5.50879 8.84556 4.92974C9.64895 4.35068 10.5784 3.97083 11.5574 3.82148C12.5364 3.67213 13.5369 3.75756 14.4764 4.07073C15.4159 4.3839 16.2676 4.91584 16.9612 5.62272C17.6547 6.3296 18.1704 7.19118 18.4657 8.13645C18.761 9.08173 18.8274 10.0836 18.6595 11.0596C18.4916 12.0356 18.0942 12.9577 17.5 13.75"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.375 12.5L11.875 10L14.375 12.5"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.875 16.25V10"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
