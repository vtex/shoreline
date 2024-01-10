import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconHeadset = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconHeadset(props, ref) {
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
        d="M17.5 15.625V16.25C17.5 16.913 17.2366 17.5489 16.7678 18.0178C16.2989 18.4866 15.663 18.75 15 18.75H10.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 10H15C14.6685 10 14.3505 10.1317 14.1161 10.3661C13.8817 10.6005 13.75 10.9185 13.75 11.25V14.375C13.75 14.7065 13.8817 15.0245 14.1161 15.2589C14.3505 15.4933 14.6685 15.625 15 15.625H17.5V10ZM17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10M2.5 10V14.375C2.5 14.7065 2.6317 15.0245 2.86612 15.2589C3.10054 15.4933 3.41848 15.625 3.75 15.625H5C5.33152 15.625 5.64946 15.4933 5.88388 15.2589C6.1183 15.0245 6.25 14.7065 6.25 14.375V11.25C6.25 10.9185 6.1183 10.6005 5.88388 10.3661C5.64946 10.1317 5.33152 10 5 10H2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
