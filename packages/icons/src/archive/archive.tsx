import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconArchive = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconArchive(props, ref) {
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
        d="M2.625 5.125V6.75H17.375V5.125H2.625ZM1.125 5C1.125 4.24061 1.74061 3.625 2.5 3.625H17.5C18.2594 3.625 18.875 4.24061 18.875 5V6.875C18.875 7.63439 18.2594 8.25 17.5 8.25H2.5C1.74061 8.25 1.125 7.63439 1.125 6.875V5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.125 6.75C3.53921 6.75 3.875 7.08579 3.875 7.5V14.875H16.125V7.5C16.125 7.08579 16.4608 6.75 16.875 6.75C17.2892 6.75 17.625 7.08579 17.625 7.5V15C17.625 15.3647 17.4801 15.7144 17.2223 15.9723C16.9644 16.2301 16.6147 16.375 16.25 16.375H3.75C3.38533 16.375 3.03559 16.2301 2.77773 15.9723C2.51987 15.7144 2.375 15.3647 2.375 15V7.5C2.375 7.08579 2.71079 6.75 3.125 6.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.375 10.625C7.375 10.2108 7.71079 9.875 8.125 9.875H11.875C12.2892 9.875 12.625 10.2108 12.625 10.625C12.625 11.0392 12.2892 11.375 11.875 11.375H8.125C7.71079 11.375 7.375 11.0392 7.375 10.625Z"
        fill="currentColor"
      />
    </svg>
  )
})
