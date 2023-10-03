import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconInfo = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconInfo(props, ref) {
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
        d="M8.625 9.375C8.625 8.96079 8.96079 8.625 9.375 8.625C9.73967 8.625 10.0894 8.76987 10.3473 9.02773C10.6051 9.28559 10.75 9.63533 10.75 10V13.0104C11.1047 13.0699 11.375 13.3784 11.375 13.75C11.375 14.1642 11.0392 14.5 10.625 14.5C10.2603 14.5 9.91059 14.3551 9.65273 14.0973C9.39486 13.8394 9.25 13.4897 9.25 13.125V10.1146C8.89529 10.0551 8.625 9.74662 8.625 9.375Z"
        fill="currentColor"
      />
      <path
        d="M9.6875 7.34375C10.119 7.34375 10.4688 6.99397 10.4688 6.5625C10.4688 6.13103 10.119 5.78125 9.6875 5.78125C9.25603 5.78125 8.90625 6.13103 8.90625 6.5625C8.90625 6.99397 9.25603 7.34375 9.6875 7.34375Z"
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