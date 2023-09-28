import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconUser = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconUser(props, ref) {
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
        d="M10 3.25C7.65279 3.25 5.75 5.15279 5.75 7.5C5.75 9.84721 7.65279 11.75 10 11.75C12.3472 11.75 14.25 9.84721 14.25 7.5C14.25 5.15279 12.3472 3.25 10 3.25ZM4.25 7.5C4.25 4.32436 6.82436 1.75 10 1.75C13.1756 1.75 15.75 4.32436 15.75 7.5C15.75 10.6756 13.1756 13.25 10 13.25C6.82436 13.25 4.25 10.6756 4.25 7.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 13.25C7.04799 13.25 4.53792 14.8509 3.14913 17.2507C2.94166 17.6092 2.48284 17.7316 2.12433 17.5241C1.76583 17.3167 1.64339 16.8578 1.85087 16.4993C3.48865 13.6694 6.47546 11.75 10 11.75C13.5245 11.75 16.5114 13.6694 18.1491 16.4993C18.3566 16.8578 18.2342 17.3167 17.8757 17.5241C17.5172 17.7316 17.0583 17.6092 16.8509 17.2507C15.4621 14.8509 12.952 13.25 10 13.25Z"
        fill="currentColor"
      />
    </svg>
  )
})
