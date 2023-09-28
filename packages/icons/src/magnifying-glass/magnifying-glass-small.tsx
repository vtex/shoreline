import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconMagnifyingGlassSmall = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconMagnifyingGlassSmall(props, ref) {
  return (
    <svg
      data-sl-icon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1.25C3.82436 1.25 1.25 3.82436 1.25 7C1.25 10.1756 3.82436 12.75 7 12.75C8.31745 12.75 9.53141 12.3069 10.501 11.5617L13.4697 14.5303C13.7626 14.8232 14.2375 14.8232 14.5303 14.5303C14.8232 14.2375 14.8232 13.7626 14.5303 13.4697L11.5617 10.501C12.3069 9.53141 12.75 8.31745 12.75 7C12.75 3.82436 10.1756 1.25 7 1.25ZM2.75 7C2.75 4.65279 4.65279 2.75 7 2.75C9.34721 2.75 11.25 4.65279 11.25 7C11.25 9.34721 9.34721 11.25 7 11.25C4.65279 11.25 2.75 9.34721 2.75 7Z"
        fill="currentColor"
      />
    </svg>
  )
})
