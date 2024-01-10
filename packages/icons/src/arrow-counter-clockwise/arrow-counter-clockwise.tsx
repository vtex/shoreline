import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArrowCounterClockwise = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArrowCounterClockwise(props, ref) {
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
        d="M1.875 4.375V8.125H5.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.28047 14.9999C6.26318 15.9274 7.49741 16.5447 8.82895 16.7747C10.1605 17.0047 11.5303 16.8372 12.7672 16.2932C14.0041 15.7491 15.0532 14.8527 15.7835 13.7158C16.5139 12.5789 16.893 11.252 16.8735 9.90089C16.854 8.54978 16.4368 7.23436 15.674 6.119C14.9112 5.00364 13.8366 4.13779 12.5846 3.62965C11.3325 3.1215 9.95847 2.99359 8.63412 3.26189C7.30977 3.53019 6.09385 4.18281 5.13828 5.1382L1.875 8.12492"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
