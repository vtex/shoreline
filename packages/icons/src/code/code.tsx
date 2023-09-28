import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCode = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCode(props, ref) {
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
        d="M5.57617 6.39507C5.84134 6.71327 5.79835 7.1862 5.48014 7.45137L2.42154 10.0002L5.48014 12.549C5.79835 12.8142 5.84134 13.2871 5.57617 13.6053C5.31099 13.9235 4.83807 13.9665 4.51986 13.7014L0.769862 10.5764C0.598867 10.4339 0.5 10.2228 0.5 10.0002C0.5 9.77762 0.598867 9.56653 0.769862 9.42404L4.51986 6.29904C4.83807 6.03387 5.31099 6.07686 5.57617 6.39507Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4238 6.39507C14.689 6.07686 15.1619 6.03387 15.4801 6.29904L19.2301 9.42404C19.4011 9.56653 19.5 9.77762 19.5 10.0002C19.5 10.2228 19.4011 10.4339 19.2301 10.5764L15.4801 13.7014C15.1619 13.9665 14.689 13.9235 14.4238 13.6053C14.1587 13.2871 14.2017 12.8142 14.5199 12.549L17.5785 10.0002L14.5199 7.45137C14.2017 7.1862 14.1587 6.71327 14.4238 6.39507Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7563 2.42036C13.1456 2.56191 13.3464 2.99224 13.2048 3.38151L8.20484 17.1315C8.06329 17.5208 7.63297 17.7216 7.24369 17.58C6.85442 17.4385 6.6536 17.0082 6.79516 16.6189L11.7952 2.8689C11.9367 2.47962 12.367 2.2788 12.7563 2.42036Z"
        fill="currentColor"
      />
    </svg>
  )
})
