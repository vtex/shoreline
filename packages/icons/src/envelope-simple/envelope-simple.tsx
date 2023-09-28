import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconEnvelopeSimple = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconEnvelopeSimple(props, ref) {
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
        d="M1.75 4.375C1.75 3.96079 2.08579 3.625 2.5 3.625H17.5C17.9142 3.625 18.25 3.96079 18.25 4.375V15C18.25 15.3647 18.1051 15.7144 17.8473 15.9723C17.5894 16.2301 17.2397 16.375 16.875 16.375H3.125C2.76033 16.375 2.41059 16.2301 2.15273 15.9723C1.89487 15.7144 1.75 15.3647 1.75 15V4.375ZM3.25 5.125V14.875H16.75V5.125H3.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.94713 3.86821C2.22703 3.56287 2.70145 3.54224 3.00679 3.82214L10 10.2326L16.9932 3.82214C17.2985 3.54224 17.773 3.56287 18.0529 3.86821C18.3328 4.17355 18.3121 4.64798 18.0068 4.92787L10.5068 11.8029C10.2201 12.0657 9.77995 12.0657 9.49321 11.8029L1.99321 4.92787C1.68787 4.64798 1.66724 4.17355 1.94713 3.86821Z"
        fill="currentColor"
      />
    </svg>
  )
})
