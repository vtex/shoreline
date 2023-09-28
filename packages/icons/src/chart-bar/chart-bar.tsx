import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconChartBar = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconChartBar(props, ref) {
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
        d="M3 10.625C3 10.2108 3.33579 9.875 3.75 9.875H7.5C7.91421 9.875 8.25 10.2108 8.25 10.625C8.25 11.0392 7.91421 11.375 7.5 11.375H4.5V16.25C4.5 16.6642 4.16421 17 3.75 17C3.33579 17 3 16.6642 3 16.25V10.625Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 16.25C1.75 15.8358 2.08579 15.5 2.5 15.5H17.5C17.9142 15.5 18.25 15.8358 18.25 16.25C18.25 16.6642 17.9142 17 17.5 17H2.5C2.08579 17 1.75 16.6642 1.75 16.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 6.875C6.75 6.46079 7.08579 6.125 7.5 6.125H11.875C12.2892 6.125 12.625 6.46079 12.625 6.875C12.625 7.28921 12.2892 7.625 11.875 7.625H8.25V16.25C8.25 16.6642 7.91421 17 7.5 17C7.08579 17 6.75 16.6642 6.75 16.25V6.875Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.125 3.125C11.125 2.71079 11.4608 2.375 11.875 2.375H16.25C16.6642 2.375 17 2.71079 17 3.125V16.25C17 16.6642 16.6642 17 16.25 17C15.8358 17 15.5 16.6642 15.5 16.25V3.875H12.625V16.25C12.625 16.6642 12.2892 17 11.875 17C11.4608 17 11.125 16.6642 11.125 16.25V3.125Z"
        fill="currentColor"
      />
    </svg>
  )
})
