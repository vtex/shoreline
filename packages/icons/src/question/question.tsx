import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconQuestion = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconQuestion(props, ref) {
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
        d="M10 14.8438C10.4315 14.8438 10.7812 14.494 10.7812 14.0625C10.7812 13.631 10.4315 13.2812 10 13.2812C9.56853 13.2812 9.21875 13.631 9.21875 14.0625C9.21875 14.494 9.56853 14.8438 10 14.8438Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 8.4375C6.75 6.72455 8.3025 5.5 10 5.5C11.6975 5.5 13.25 6.72455 13.25 8.4375C13.25 9.89374 12.128 10.997 10.7487 11.295C10.7254 11.6882 10.3991 12 10 12C9.58579 12 9.25 11.6642 9.25 11.25V10.625C9.25 10.2108 9.58579 9.875 10 9.875C11.0634 9.875 11.75 9.14018 11.75 8.4375C11.75 7.73482 11.0634 7 10 7C8.93656 7 8.25 7.73482 8.25 8.4375V8.75C8.25 9.16421 7.91421 9.5 7.5 9.5C7.08579 9.5 6.75 9.16421 6.75 8.75V8.4375Z"
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
