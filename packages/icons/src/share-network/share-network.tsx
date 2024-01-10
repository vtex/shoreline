import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconShareNetwork = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconShareNetwork(props, ref) {
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
        d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 18.125C15.1307 18.125 16.25 17.0057 16.25 15.625C16.25 14.2443 15.1307 13.125 13.75 13.125C12.3693 13.125 11.25 14.2443 11.25 15.625C11.25 17.0057 12.3693 18.125 13.75 18.125Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 6.875C15.1307 6.875 16.25 5.75571 16.25 4.375C16.25 2.99429 15.1307 1.875 13.75 1.875C12.3693 1.875 11.25 2.99429 11.25 4.375C11.25 5.75571 12.3693 6.875 13.75 6.875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6484 5.72656L7.10156 8.64844"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.10156 11.3516L11.6484 14.2734"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
