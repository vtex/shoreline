import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconEnvelopeFill = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconEnvelopeFill(props, ref) {
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
        d="M17.5 3.75H2.5C2.33424 3.75 2.17527 3.81585 2.05806 3.93306C1.94085 4.05027 1.875 4.20924 1.875 4.375V15C1.875 15.3315 2.0067 15.6495 2.24112 15.8839C2.47554 16.1183 2.79348 16.25 3.125 16.25H16.875C17.2065 16.25 17.5245 16.1183 17.7589 15.8839C17.9933 15.6495 18.125 15.3315 18.125 15V4.375C18.125 4.20924 18.0592 4.05027 17.9419 3.93306C17.8247 3.81585 17.6658 3.75 17.5 3.75ZM16.875 15H3.125V5.79609L9.57734 11.7109C9.69265 11.8168 9.84348 11.8755 10 11.8755C10.1565 11.8755 10.3074 11.8168 10.4227 11.7109L16.875 5.79609V15Z"
        fill="currentColor"
      />
    </svg>
  )
})
