import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPlayCircle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPlayCircle(props, ref) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 10C3.25 6.27208 6.27208 3.25 10 3.25C13.7279 3.25 16.75 6.27208 16.75 10C16.75 13.7279 13.7279 16.75 10 16.75C6.27208 16.75 3.25 13.7279 3.25 10ZM10 1.75C5.44365 1.75 1.75 5.44365 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25C14.5563 18.25 18.25 14.5563 18.25 10C18.25 5.44365 14.5563 1.75 10 1.75ZM9.16603 6.87596C8.93588 6.72254 8.63997 6.70823 8.39611 6.83875C8.15224 6.96926 8 7.2234 8 7.5V12.5C8 12.7766 8.15224 13.0307 8.39611 13.1613C8.63997 13.2918 8.93588 13.2775 9.16603 13.124L12.916 10.624C13.1247 10.4849 13.25 10.2508 13.25 10C13.25 9.74924 13.1247 9.51506 12.916 9.37596L9.16603 6.87596ZM9.5 11.0986V8.90139L11.1479 10L9.5 11.0986Z"
        fill="currentColor"
      />
    </svg>
  )
})
