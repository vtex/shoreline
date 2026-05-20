import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'

export const IconSquareFill = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconSquareFill(props, ref) {
  return (
    <svg
      data-sl-icon-fill
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
        d="M4.375 2.5C3.33947 2.5 2.5 3.33947 2.5 4.375V15.625C2.5 16.6605 3.33947 17.5 4.375 17.5H15.625C16.6605 17.5 17.5 16.6605 17.5 15.625V4.375C17.5 3.33947 16.6605 2.5 15.625 2.5H4.375Z"
        fill="currentColor"
      />
    </svg>
  )
})
