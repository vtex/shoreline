import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconLayout = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconLayout(props, ref) {
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
        d="M8.125 7.375C8.53921 7.375 8.875 7.71079 8.875 8.125V16.25C8.875 16.6642 8.53921 17 8.125 17C7.71079 17 7.375 16.6642 7.375 16.25V8.125C7.375 7.71079 7.71079 7.375 8.125 7.375Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 8.125C1.75 7.71079 2.08579 7.375 2.5 7.375H17.5C17.9142 7.375 18.25 7.71079 18.25 8.125C18.25 8.53921 17.9142 8.875 17.5 8.875H2.5C2.08579 8.875 1.75 8.53921 1.75 8.125Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 4.5V15.5H16.75V4.5H3.25ZM1.75 4.375C1.75 3.61561 2.36561 3 3.125 3H16.875C17.6344 3 18.25 3.61561 18.25 4.375V15.625C18.25 16.3844 17.6344 17 16.875 17H3.125C2.36561 17 1.75 16.3844 1.75 15.625V4.375Z"
        fill="currentColor"
      />
    </svg>
  )
})
