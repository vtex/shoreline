import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconIdentificationCard = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconIdentificationCard(props, ref) {
  return (
    <svg
      data-sl-icon
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
        d="M11.125 8.75C11.125 8.33579 11.4608 8 11.875 8H15C15.4142 8 15.75 8.33579 15.75 8.75C15.75 9.16421 15.4142 9.5 15 9.5H11.875C11.4608 9.5 11.125 9.16421 11.125 8.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.125 11.25C11.125 10.8358 11.4608 10.5 11.875 10.5H15C15.4142 10.5 15.75 10.8358 15.75 11.25C15.75 11.6642 15.4142 12 15 12H11.875C11.4608 12 11.125 11.6642 11.125 11.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 4.5V15.5H16.75V4.5H3.25ZM1.75 4.375C1.75 3.61561 2.36561 3 3.125 3H16.875C17.6344 3 18.25 3.61561 18.25 4.375V15.625C18.25 16.3844 17.6344 17 16.875 17H3.125C2.36561 17 1.75 16.3844 1.75 15.625V4.375Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 8.25C6.87868 8.25 6.375 8.75368 6.375 9.375C6.375 9.99632 6.87868 10.5 7.5 10.5C8.12132 10.5 8.625 9.99632 8.625 9.375C8.625 8.75368 8.12132 8.25 7.5 8.25ZM4.875 9.375C4.875 7.92525 6.05025 6.75 7.5 6.75C8.94975 6.75 10.125 7.92525 10.125 9.375C10.125 10.8247 8.94975 12 7.5 12C6.05025 12 4.875 10.8247 4.875 9.375Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 12C6.65776 12 5.91363 12.5838 5.72635 13.3119C5.62316 13.713 5.2143 13.9545 4.81315 13.8514C4.412 13.7482 4.17045 13.3393 4.27365 12.9381C4.64106 11.5099 6.01255 10.5 7.5 10.5C8.98681 10.5 10.3599 11.5086 10.7265 12.9388C10.8294 13.34 10.5875 13.7487 10.1862 13.8515C9.78499 13.9544 9.37634 13.7125 9.27349 13.3112C9.08696 12.5836 8.34287 12 7.5 12Z"
        fill="currentColor"
      />
    </svg>
  )
})
