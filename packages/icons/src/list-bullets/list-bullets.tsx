import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconListBullets = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconListBullets(props, ref) {
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
        d="M6.125 5C6.125 4.58579 6.46079 4.25 6.875 4.25H16.875C17.2892 4.25 17.625 4.58579 17.625 5C17.625 5.41421 17.2892 5.75 16.875 5.75H6.875C6.46079 5.75 6.125 5.41421 6.125 5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.12549 10C6.12549 9.58579 6.46127 9.25 6.87549 9.25H16.875C17.2892 9.25 17.625 9.58579 17.625 10C17.625 10.4142 17.2892 10.75 16.875 10.75H6.87549C6.46127 10.75 6.12549 10.4142 6.12549 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.12549 15C6.12549 14.5858 6.46127 14.25 6.87549 14.25H16.875C17.2892 14.25 17.625 14.5858 17.625 15C17.625 15.4142 17.2892 15.75 16.875 15.75H6.87549C6.46127 15.75 6.12549 15.4142 6.12549 15Z"
        fill="currentColor"
      />
      <path
        d="M3.4375 5.78125C3.86897 5.78125 4.21875 5.43147 4.21875 5C4.21875 4.56853 3.86897 4.21875 3.4375 4.21875C3.00603 4.21875 2.65625 4.56853 2.65625 5C2.65625 5.43147 3.00603 5.78125 3.4375 5.78125Z"
        fill="currentColor"
      />
      <path
        d="M3.4375 15.7812C3.86897 15.7812 4.21875 15.4315 4.21875 15C4.21875 14.5685 3.86897 14.2188 3.4375 14.2188C3.00603 14.2188 2.65625 14.5685 2.65625 15C2.65625 15.4315 3.00603 15.7812 3.4375 15.7812Z"
        fill="currentColor"
      />
      <path
        d="M3.4375 10.7812C3.86897 10.7812 4.21875 10.4315 4.21875 10C4.21875 9.56853 3.86897 9.21875 3.4375 9.21875C3.00603 9.21875 2.65625 9.56853 2.65625 10C2.65625 10.4315 3.00603 10.7812 3.4375 10.7812Z"
        fill="currentColor"
      />
    </svg>
  )
})
