import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconListBullets = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconListBullets(props, ref) {
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
        d="M6.875 5H16.875"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.87549 10H16.875"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.87549 15H16.875"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.4375 5.78125C3.86897 5.78125 4.21875 5.43147 4.21875 5C4.21875 4.56853 3.86897 4.21875 3.4375 4.21875C3.00603 4.21875 2.65625 4.56853 2.65625 5C2.65625 5.43147 3.00603 5.78125 3.4375 5.78125Z"
        fill="currentColor"
      />
      <path
        d="M3.4375 15.7812C3.86897 15.7812 4.21875 15.4315 4.21875 15C4.21875 14.5685 3.86897 14.2188 3.4375 14.2188C3.00603 14.2188 2.65625 14.5685 2.65625 15C2.65625 15.4315 3.00603 15.7812 3.4375 15.7812Z"
        fill="currentColor"
      />
      <path
        d="M3.4375 10.7812C3.86897 10.7812 4.21875 10.4315 4.21875 10C4.21875 9.56853 3.86897 9.21875 3.4375 9.21875C3.00603 9.21875 2.65625 9.56853 2.65625 10C2.65625 10.4315 3.00603 10.7812 3.4375 10.7812Z"
        fill="currentColor"
      />
    </svg>
  )
})
