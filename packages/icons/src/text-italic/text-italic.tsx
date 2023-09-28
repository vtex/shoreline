import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTextItalic = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTextItalic(props, ref) {
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
        d="M12.1117 3.66369C12.5046 3.79468 12.717 4.21942 12.586 4.61237L8.83602 15.8624C8.70504 16.2553 8.2803 16.4677 7.88734 16.3367C7.49438 16.2057 7.28201 15.781 7.413 15.388L11.163 4.13803C11.294 3.74508 11.7187 3.53271 12.1117 3.66369Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.24951 15.6252C4.24951 15.211 4.5853 14.8752 4.99951 14.8752H11.2495C11.6637 14.8752 11.9995 15.211 11.9995 15.6252C11.9995 16.0394 11.6637 16.3752 11.2495 16.3752H4.99951C4.5853 16.3752 4.24951 16.0394 4.24951 15.6252Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99951 4.3752C7.99951 3.96099 8.3353 3.6252 8.74951 3.6252H14.9995C15.4137 3.6252 15.7495 3.96099 15.7495 4.3752C15.7495 4.78942 15.4137 5.1252 14.9995 5.1252H8.74951C8.3353 5.1252 7.99951 4.78942 7.99951 4.3752Z"
        fill="currentColor"
      />
    </svg>
  )
})
