import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconLinkBreak = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconLinkBreak(props, ref) {
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
        d="M14.375 9.99993L15.3344 9.0843C15.9036 8.49492 16.2186 7.70554 16.2115 6.88618C16.2044 6.06681 15.8757 5.28302 15.2963 4.70362C14.7169 4.12422 13.9331 3.79557 13.1138 3.78845C12.2944 3.78133 11.505 4.09631 10.9156 4.66555L10 5.62493"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.62517 10L4.6658 10.9156C4.09655 11.505 3.78157 12.2944 3.78869 13.1138C3.79581 13.9331 4.12447 14.7169 4.70387 15.2963C5.28327 15.8757 6.06705 16.2044 6.88642 16.2115C7.70578 16.2186 8.49517 15.9036 9.08455 15.3344L10.0002 14.375"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.375 12.5H16.25"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 7.5H5.625"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 14.375V16.25"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 3.75V5.625"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
