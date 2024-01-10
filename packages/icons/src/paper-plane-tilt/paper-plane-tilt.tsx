import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPaperPlaneTilt = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPaperPlaneTilt(props, ref) {
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
        d="M17.4758 3.29526C17.506 3.18834 17.5071 3.07533 17.479 2.96786C17.451 2.86039 17.3948 2.76233 17.3162 2.68379C17.2377 2.60525 17.1396 2.54906 17.0321 2.521C16.9247 2.49294 16.8117 2.49403 16.7048 2.52416L1.70475 7.0726C1.58229 7.10716 1.4733 7.17828 1.39234 7.27645C1.31138 7.37462 1.26231 7.49516 1.25169 7.62196C1.24107 7.74876 1.26942 7.87578 1.33293 7.98605C1.39643 8.09631 1.49209 8.18456 1.6071 8.23901L8.29616 11.4062C8.42639 11.468 8.53127 11.5728 8.59304 11.7031L11.761 18.3914C11.8154 18.5064 11.9037 18.602 12.014 18.6655C12.1242 18.729 12.2512 18.7574 12.3781 18.7468C12.5049 18.7361 12.6254 18.6871 12.7236 18.6061C12.8217 18.5252 12.8928 18.4162 12.9274 18.2937L17.4758 3.29526Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.47021 11.5297L12.4999 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
