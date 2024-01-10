import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconMegaphone = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconMegaphone(props, ref) {
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
        d="M8.125 6.25V15.6773C8.12494 15.7801 8.09953 15.8813 8.05101 15.9719C8.0025 16.0626 7.93238 16.1398 7.84688 16.1969L6.9875 16.7695C6.90414 16.8251 6.80865 16.8598 6.70906 16.8708C6.60947 16.8817 6.50872 16.8686 6.41528 16.8324C6.32184 16.7963 6.23846 16.7382 6.17217 16.6631C6.10588 16.5879 6.05862 16.498 6.03438 16.4008L5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 15.625C17.5 15.7441 17.466 15.8606 17.402 15.961C17.338 16.0613 17.2466 16.1413 17.1387 16.1915C17.0308 16.2418 16.9108 16.2601 16.7928 16.2445C16.6748 16.2288 16.5637 16.1798 16.4727 16.1032C12.3789 12.6688 8.125 12.5 8.125 12.5H5C4.1712 12.5 3.37634 12.1708 2.79029 11.5848C2.20424 10.9987 1.875 10.2039 1.875 9.37505C1.875 8.54625 2.20424 7.75139 2.79029 7.16534C3.37634 6.57929 4.1712 6.25005 5 6.25005H8.125C8.125 6.25005 12.3789 6.0813 16.4727 2.64771C16.5637 2.57112 16.6747 2.52211 16.7926 2.50643C16.9105 2.49075 17.0305 2.50905 17.1384 2.55917C17.2462 2.6093 17.3376 2.68917 17.4016 2.78941C17.4657 2.88965 17.4998 3.00609 17.5 3.12505V15.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
