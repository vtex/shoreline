import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCube = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCube(props, ref) {
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
        d="M2.55469 6.0094L10 10.0844L17.4453 6.0094"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3 1.95317L17.175 5.71723C17.2732 5.77095 17.3551 5.85003 17.4123 5.94623C17.4695 6.04243 17.4997 6.15221 17.5 6.26411V13.736C17.4997 13.8479 17.4695 13.9577 17.4123 14.0539C17.3551 14.1501 17.2732 14.2291 17.175 14.2829L10.3 18.0469C10.208 18.0973 10.1049 18.1236 10 18.1236C9.89515 18.1236 9.79198 18.0973 9.7 18.0469L2.825 14.2829C2.72683 14.2291 2.64488 14.1501 2.58772 14.0539C2.53055 13.9577 2.50025 13.8479 2.5 13.736V6.26411C2.50025 6.15221 2.53055 6.04243 2.58772 5.94623C2.64488 5.85003 2.72683 5.77095 2.825 5.71723L9.7 1.95317C9.79198 1.90284 9.89515 1.87646 10 1.87646C10.1049 1.87646 10.208 1.90284 10.3 1.95317Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.0852V18.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
