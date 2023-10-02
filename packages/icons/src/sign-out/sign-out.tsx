import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconSignOut = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconSignOut(props, ref) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.77773 2.77773C3.03559 2.51987 3.38533 2.375 3.75 2.375H8.125C8.53921 2.375 8.875 2.71079 8.875 3.125C8.875 3.53921 8.53921 3.875 8.125 3.875H3.875V16.125H8.125C8.53921 16.125 8.875 16.4608 8.875 16.875C8.875 17.2892 8.53921 17.625 8.125 17.625H3.75C3.38533 17.625 3.03559 17.4801 2.77773 17.2223C2.51987 16.9644 2.375 16.6147 2.375 16.25V3.75C2.375 3.38533 2.51987 3.03559 2.77773 2.77773Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.375 10C7.375 9.58579 7.71079 9.25 8.125 9.25H16.875C17.2892 9.25 17.625 9.58579 17.625 10C17.625 10.4142 17.2892 10.75 16.875 10.75H8.125C7.71079 10.75 7.375 10.4142 7.375 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2197 6.34467C13.5126 6.05178 13.9874 6.05178 14.2803 6.34467L17.4053 9.46967C17.6982 9.76256 17.6982 10.2374 17.4053 10.5303L14.2803 13.6553C13.9874 13.9482 13.5126 13.9482 13.2197 13.6553C12.9268 13.3624 12.9268 12.8876 13.2197 12.5947L15.8143 10L13.2197 7.40533C12.9268 7.11244 12.9268 6.63756 13.2197 6.34467Z"
        fill="currentColor"
      />
    </svg>
  )
})
