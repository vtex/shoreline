import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCopySimple = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCopySimple(props, ref) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.87378 3.12451C4.87378 2.7103 5.20957 2.37451 5.62378 2.37451H16.8743C17.2885 2.37451 17.6243 2.7103 17.6243 3.12451V14.3746C17.6243 14.7888 17.2885 15.1246 16.8743 15.1246C16.4601 15.1246 16.1243 14.7888 16.1243 14.3746V3.87451H5.62378C5.20957 3.87451 4.87378 3.53873 4.87378 3.12451Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.37378 5.62457C2.37378 5.21036 2.70957 4.87457 3.12378 4.87457H14.3742C14.7885 4.87457 15.1242 5.21036 15.1242 5.62457V16.8746C15.1242 17.2888 14.7885 17.6246 14.3742 17.6246H3.12378C2.70957 17.6246 2.37378 17.2888 2.37378 16.8746V5.62457ZM3.87378 6.37457V16.1246H13.6242V6.37457H3.87378Z"
        fill="currentColor"
      />
    </svg>
  )
})
