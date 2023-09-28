import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCheckCircle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCheckCircle(props, ref) {
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
        d="M13.6553 7.59467C13.9482 7.88756 13.9482 8.36244 13.6553 8.65533L9.28033 13.0303C8.98744 13.3232 8.51256 13.3232 8.21967 13.0303L6.34467 11.1553C6.05178 10.8624 6.05178 10.3876 6.34467 10.0947C6.63756 9.80178 7.11244 9.80178 7.40533 10.0947L8.75 11.4393L12.5947 7.59467C12.8876 7.30178 13.3624 7.30178 13.6553 7.59467Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3.25C6.27208 3.25 3.25 6.27208 3.25 10C3.25 13.7279 6.27208 16.75 10 16.75C13.7279 16.75 16.75 13.7279 16.75 10C16.75 6.27208 13.7279 3.25 10 3.25ZM1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.25 14.5563 14.5563 18.25 10 18.25C5.44365 18.25 1.75 14.5563 1.75 10Z"
        fill="currentColor"
      />
    </svg>
  )
})
