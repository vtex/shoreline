import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconX = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<'svg'>>(
  function IconX(props, ref) {
    return (
      <svg
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
          d="M16.1553 4.90533C16.4482 4.61244 16.4482 4.13756 16.1553 3.84467C15.8624 3.55178 15.3876 3.55178 15.0947 3.84467L10 8.93934L4.90533 3.84467C4.61244 3.55178 4.13756 3.55178 3.84467 3.84467C3.55178 4.13756 3.55178 4.61244 3.84467 4.90533L8.93934 10L3.84467 15.0947C3.55178 15.3876 3.55178 15.8624 3.84467 16.1553C4.13756 16.4482 4.61244 16.4482 4.90533 16.1553L10 11.0607L15.0947 16.1553C15.3876 16.4482 15.8624 16.4482 16.1553 16.1553C16.4482 15.8624 16.4482 15.3876 16.1553 15.0947L11.0607 10L16.1553 4.90533Z"
          fill="currentColor"
        />
      </svg>
    )
  }
)
