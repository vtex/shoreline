import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPulse = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPulse(props, ref) {
  return (
    <svg
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
        d="M7.52349 2.37537C7.82598 2.38485 8.09313 2.5752 8.20087 2.85801L12.5929 14.3871L14.9542 9.66459C15.0812 9.4105 15.3409 9.25 15.625 9.25H18.125C18.5392 9.25 18.875 9.58579 18.875 10C18.875 10.4142 18.5392 10.75 18.125 10.75H16.0885L13.1708 16.5854C13.0377 16.8516 12.7599 17.0139 12.4626 16.9991C12.1654 16.9842 11.9051 16.7951 11.7991 16.517L7.439 5.07165L5.05777 10.3104C4.93607 10.5781 4.66911 10.75 4.375 10.75H1.875C1.46079 10.75 1.125 10.4142 1.125 10C1.125 9.58579 1.46079 9.25 1.875 9.25H3.89206L6.81722 2.81465C6.94246 2.53914 7.221 2.36589 7.52349 2.37537Z"
        fill="currentColor"
      />
    </svg>
  )
})
