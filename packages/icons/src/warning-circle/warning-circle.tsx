import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconWarningCircle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconWarningCircle(props, ref) {
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
        d="M10 3.25C6.27208 3.25 3.25 6.27208 3.25 10C3.25 13.7279 6.27208 16.75 10 16.75C13.7279 16.75 16.75 13.7279 16.75 10C16.75 6.27208 13.7279 3.25 10 3.25ZM1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.25 14.5563 14.5563 18.25 10 18.25C5.44365 18.25 1.75 14.5563 1.75 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5.5C10.4142 5.5 10.75 5.83579 10.75 6.25V10.625C10.75 11.0392 10.4142 11.375 10 11.375C9.58579 11.375 9.25 11.0392 9.25 10.625V6.25C9.25 5.83579 9.58579 5.5 10 5.5Z"
        fill="currentColor"
      />
      <path
        d="M10 14.2188C10.4315 14.2188 10.7812 13.869 10.7812 13.4375C10.7812 13.006 10.4315 12.6562 10 12.6562C9.56853 12.6562 9.21875 13.006 9.21875 13.4375C9.21875 13.869 9.56853 14.2188 10 14.2188Z"
        fill="currentColor"
      />
    </svg>
  )
})
