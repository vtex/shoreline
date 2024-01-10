import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconEyeSlash = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconEyeSlash(props, ref) {
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
        d="M3.75 3.125L16.25 16.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1024 12.3125C11.4891 12.8701 10.6794 13.1612 9.85146 13.1218C9.02351 13.0824 8.24514 12.7157 7.68756 12.1023C7.12998 11.489 6.83888 10.6793 6.87829 9.8514C6.91771 9.02345 7.2844 8.24508 7.89772 7.6875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5884 6.93066C11.2528 7.05789 11.8579 7.39726 12.3129 7.89779C12.768 8.39832 13.0483 9.03299 13.1118 9.70645"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2976 13.2109C18.0007 11.6859 18.7499 10 18.7499 10C18.7499 10 16.2499 4.37501 9.9999 4.37501C9.45867 4.37427 8.91829 4.41817 8.38428 4.50626"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.78125 5.35938C2.59609 6.97187 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C11.4645 15.6365 12.9106 15.2991 14.2188 14.6406"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
