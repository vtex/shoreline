import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconDotsThreeVertical = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconDotsThreeVertical(props, ref) {
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
        d="M10 6.09375C10.8629 6.09375 11.5625 5.39419 11.5625 4.53125C11.5625 3.66831 10.8629 2.96875 10 2.96875C9.13706 2.96875 8.4375 3.66831 8.4375 4.53125C8.4375 5.39419 9.13706 6.09375 10 6.09375ZM10 11.5625C10.8629 11.5625 11.5625 10.8629 11.5625 10C11.5625 9.13705 10.8629 8.4375 10 8.4375C9.13706 8.4375 8.4375 9.13705 8.4375 10C8.4375 10.8629 9.13706 11.5625 10 11.5625ZM11.5625 15.4688C11.5625 16.3317 10.8629 17.0312 10 17.0312C9.13706 17.0312 8.4375 16.3317 8.4375 15.4688C8.4375 14.6058 9.13706 13.9062 10 13.9062C10.8629 13.9062 11.5625 14.6058 11.5625 15.4688Z"
        fill="currentColor"
      />
    </svg>
  )
})
