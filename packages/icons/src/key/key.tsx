import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconKey = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconKey(props, ref) {
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
        d="M7.27891 9.5962C6.79615 8.39341 6.74355 7.06082 7.13001 5.82372C7.51647 4.58662 8.31827 3.52093 9.39985 2.80683C10.4814 2.09272 11.7764 1.77402 13.0659 1.90461C14.3553 2.0352 15.5602 2.60706 16.4766 3.52351C17.393 4.43996 17.9649 5.64477 18.0955 6.93423C18.2261 8.22368 17.9074 9.51868 17.1933 10.6003C16.4792 11.6818 15.4135 12.4836 14.1764 12.8701C12.9393 13.2566 11.6067 13.204 10.4039 12.7212L9.375 13.7501H7.5V15.6251H5.625V17.5001H2.5V14.3751L7.27891 9.5962Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7812 5.9375C14.7812 6.33445 14.4595 6.65625 14.0625 6.65625C13.6655 6.65625 13.3438 6.33445 13.3438 5.9375C13.3438 5.54055 13.6655 5.21875 14.0625 5.21875C14.4595 5.21875 14.7812 5.54055 14.7812 5.9375Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="0.125"
      />
    </svg>
  )
})
