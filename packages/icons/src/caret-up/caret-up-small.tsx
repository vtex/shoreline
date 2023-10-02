import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCaretUpSmall = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCaretUpSmall(props, ref) {
  return (
    <svg
      data-sl-icon-small
      width="16"
      height="16"
      viewBox="0 0 16 16"
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
        d="M7.46967 4.46967C7.76256 4.17678 8.23744 4.17678 8.53033 4.46967L13.5303 9.46967C13.8232 9.76256 13.8232 10.2374 13.5303 10.5303C13.2374 10.8232 12.7626 10.8232 12.4697 10.5303L8 6.06066L3.53033 10.5303C3.23744 10.8232 2.76256 10.8232 2.46967 10.5303C2.17678 10.2374 2.17678 9.76256 2.46967 9.46967L7.46967 4.46967Z"
        fill="currentColor"
      />
    </svg>
  )
})
