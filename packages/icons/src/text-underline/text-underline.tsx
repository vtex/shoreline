import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextUnderline = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextUnderline(props, ref) {
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
        d="M4.25 17.5C4.25 17.0858 4.58579 16.75 5 16.75H15C15.4142 16.75 15.75 17.0858 15.75 17.5C15.75 17.9142 15.4142 18.25 15 18.25H5C4.58579 18.25 4.25 17.9142 4.25 17.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.625 3.625C6.03921 3.625 6.375 3.96079 6.375 4.375V10.625C6.375 11.5864 6.75692 12.5084 7.43674 13.1883C8.11656 13.8681 9.03859 14.25 10 14.25C10.9614 14.25 11.8834 13.8681 12.5633 13.1883C13.2431 12.5084 13.625 11.5864 13.625 10.625V4.375C13.625 3.96079 13.9608 3.625 14.375 3.625C14.7892 3.625 15.125 3.96079 15.125 4.375V10.625C15.125 11.9842 14.585 13.2878 13.6239 14.2489C12.6628 15.21 11.3592 15.75 10 15.75C8.64077 15.75 7.3372 15.21 6.37608 14.2489C5.41495 13.2878 4.875 11.9842 4.875 10.625V4.375C4.875 3.96079 5.21079 3.625 5.625 3.625Z"
        fill="currentColor"
      />
    </svg>
  )
})
