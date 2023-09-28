import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconMagnifyingGlass = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconMagnifyingGlass(props, ref) {
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
        d="M8.75 1.75C4.88401 1.75 1.75 4.88401 1.75 8.75C1.75 12.616 4.88401 15.75 8.75 15.75C10.4128 15.75 11.9402 15.1702 13.1411 14.2018L16.9696 18.0302C17.2625 18.3231 17.7373 18.3231 18.0302 18.0302C18.3231 17.7373 18.3231 17.2625 18.0302 16.9696L14.2018 13.1411C15.1702 11.9402 15.75 10.4128 15.75 8.75C15.75 4.88401 12.616 1.75 8.75 1.75ZM3.25 8.75C3.25 5.71243 5.71243 3.25 8.75 3.25C11.7876 3.25 14.25 5.71243 14.25 8.75C14.25 11.7876 11.7876 14.25 8.75 14.25C5.71243 14.25 3.25 11.7876 3.25 8.75Z"
        fill="currentColor"
      />
    </svg>
  )
})
