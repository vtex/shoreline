import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconMagnifyingGlassPlus = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconMagnifyingGlassPlus(props, ref) {
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
        d="M5.5 8.75C5.5 8.33579 5.83579 8 6.25 8H11.25C11.6642 8 12 8.33579 12 8.75C12 9.16421 11.6642 9.5 11.25 9.5H6.25C5.83579 9.5 5.5 9.16421 5.5 8.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 3.25C5.71243 3.25 3.25 5.71243 3.25 8.75C3.25 11.7876 5.71243 14.25 8.75 14.25C11.7876 14.25 14.25 11.7876 14.25 8.75C14.25 5.71243 11.7876 3.25 8.75 3.25ZM1.75 8.75C1.75 4.88401 4.88401 1.75 8.75 1.75C12.616 1.75 15.75 4.88401 15.75 8.75C15.75 12.616 12.616 15.75 8.75 15.75C4.88401 15.75 1.75 12.616 1.75 8.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6391 12.6391C12.932 12.3462 13.4069 12.3462 13.6998 12.6391L18.0302 16.9696C18.3231 17.2625 18.3231 17.7373 18.0302 18.0302C17.7373 18.3231 17.2625 18.3231 16.9696 18.0302L12.6391 13.6998C12.3462 13.4069 12.3462 12.932 12.6391 12.6391Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 5.5C9.16421 5.5 9.5 5.83579 9.5 6.25V11.25C9.5 11.6642 9.16421 12 8.75 12C8.33579 12 8 11.6642 8 11.25V6.25C8 5.83579 8.33579 5.5 8.75 5.5Z"
        fill="currentColor"
      />
    </svg>
  )
})
