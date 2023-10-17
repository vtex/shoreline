import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconAlarm = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconAlarm(props, ref) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3.875C6.61726 3.875 3.875 6.61726 3.875 10C3.875 13.3827 6.61726 16.125 10 16.125C13.3827 16.125 16.125 13.3827 16.125 10C16.125 6.61726 13.3827 3.875 10 3.875ZM2.375 10C2.375 5.78883 5.78883 2.375 10 2.375C14.2112 2.375 17.625 5.78883 17.625 10C17.625 14.2112 14.2112 17.625 10 17.625C5.78883 17.625 2.375 14.2112 2.375 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.90533 1.34467C5.19822 1.63756 5.19822 2.11244 4.90533 2.40533L2.40533 4.90533C2.11244 5.19822 1.63756 5.19822 1.34467 4.90533C1.05178 4.61244 1.05178 4.13756 1.34467 3.84467L3.84467 1.34467C4.13756 1.05178 4.61244 1.05178 4.90533 1.34467Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0947 1.34467C15.3876 1.05178 15.8624 1.05178 16.1553 1.34467L18.6553 3.84467C18.9482 4.13756 18.9482 4.61244 18.6553 4.90533C18.3624 5.19822 17.8876 5.19822 17.5947 4.90533L15.0947 2.40533C14.8018 2.11244 14.8018 1.63756 15.0947 1.34467Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4.875C10.4142 4.875 10.75 5.21079 10.75 5.625V9.25H14.375C14.7892 9.25 15.125 9.58579 15.125 10C15.125 10.4142 14.7892 10.75 14.375 10.75H10C9.58579 10.75 9.25 10.4142 9.25 10V5.625C9.25 5.21079 9.58579 4.875 10 4.875Z"
        fill="currentColor"
      />
    </svg>
  )
})
