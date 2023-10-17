import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPrinter = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPrinter(props, ref) {
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
        d="M15.625 9.0625C15.625 9.58027 15.2053 10 14.6875 10C14.1697 10 13.75 9.58027 13.75 9.0625C13.75 8.54473 14.1697 8.125 14.6875 8.125C15.2053 8.125 15.625 8.54473 15.625 9.0625Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2.375C4.58579 2.375 4.25 2.71079 4.25 3.125V5.5H3.22891C2.12469 5.5 1.125 6.33977 1.125 7.5V13.75C1.125 14.1642 1.46079 14.5 1.875 14.5H4.25V16.875C4.25 17.2892 4.58579 17.625 5 17.625H15C15.4142 17.625 15.75 17.2892 15.75 16.875V14.5H18.125C18.5392 14.5 18.875 14.1642 18.875 13.75V7.5C18.875 6.33977 17.8753 5.5 16.7711 5.5H15.75V3.125C15.75 2.71079 15.4142 2.375 15 2.375H5ZM3.22891 7H16.7711C17.1622 7 17.375 7.27898 17.375 7.5V13H15.75V11.875C15.75 11.4608 15.4142 11.125 15 11.125H5C4.58579 11.125 4.25 11.4608 4.25 11.875V13H2.625V7.5C2.625 7.27898 2.83781 7 3.22891 7ZM5.75 5.5H14.25V3.875H5.75V5.5ZM14.25 12.625V16.125H5.75V12.625H14.25Z"
        fill="currentColor"
      />
    </svg>
  )
})
