import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const IconRows = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconRows(props, ref) {
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
        d="M16.25 11.25H3.75C3.40482 11.25 3.125 11.5298 3.125 11.875V15C3.125 15.3452 3.40482 15.625 3.75 15.625H16.25C16.5952 15.625 16.875 15.3452 16.875 15V11.875C16.875 11.5298 16.5952 11.25 16.25 11.25Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 4.375H3.75C3.40482 4.375 3.125 4.65482 3.125 5V8.125C3.125 8.47018 3.40482 8.75 3.75 8.75H16.25C16.5952 8.75 16.875 8.47018 16.875 8.125V5C16.875 4.65482 16.5952 4.375 16.25 4.375Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
