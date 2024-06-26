import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const IconFileText = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconFileText(props, ref) {
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
        d="M15.6251 17.5H4.37451C4.20875 17.5 4.04978 17.4342 3.93257 17.3169C3.81536 17.1997 3.74951 17.0408 3.74951 16.875V3.125C3.74951 2.95924 3.81536 2.80027 3.93257 2.68306C4.04978 2.56585 4.20875 2.5 4.37451 2.5H11.8751L16.2501 6.875V16.875C16.2501 16.9571 16.234 17.0383 16.2025 17.1142C16.1711 17.19 16.1251 17.2589 16.0671 17.3169C16.009 17.375 15.9401 17.421 15.8643 17.4524C15.7885 17.4838 15.7072 17.5 15.6251 17.5Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.875 2.5V6.875H16.2506"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.625H12.5"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 13.125H12.5"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
