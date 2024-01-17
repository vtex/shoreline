import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTag = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTag(props, ref) {
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
        d="M3.30781 10.8078C3.19082 10.6907 3.12508 10.5319 3.125 10.3664V3.125H10.3664C10.5319 3.12508 10.6907 3.19082 10.8078 3.30781L18.5672 11.0672C18.6843 11.1844 18.7501 11.3433 18.7501 11.509C18.7501 11.6747 18.6843 11.8336 18.5672 11.9508L11.9531 18.5672C11.8359 18.6843 11.677 18.7501 11.5113 18.7501C11.3456 18.7501 11.1867 18.6843 11.0695 18.5672L3.30781 10.8078Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.28125 6.5625C7.28125 6.95945 6.95945 7.28125 6.5625 7.28125C6.16555 7.28125 5.84375 6.95945 5.84375 6.5625C5.84375 6.16555 6.16555 5.84375 6.5625 5.84375C6.95945 5.84375 7.28125 6.16555 7.28125 6.5625Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="0.125"
      />
    </svg>
  )
})
