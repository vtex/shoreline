import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconHouse = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconHouse(props, ref) {
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
        d="M11.875 16.2501V12.5001C11.875 12.3343 11.8092 12.1753 11.6919 12.0581C11.5747 11.9409 11.4158 11.8751 11.25 11.8751H8.75C8.58424 11.8751 8.42527 11.9409 8.30806 12.0581C8.19085 12.1753 8.125 12.3343 8.125 12.5001V16.2501C8.125 16.4158 8.05915 16.5748 7.94194 16.692C7.82473 16.8092 7.66576 16.8751 7.5 16.8751H3.75C3.58424 16.8751 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.2501V9.02661C3.12501 8.93951 3.14322 8.85338 3.17847 8.77373C3.21372 8.69409 3.26523 8.62269 3.32969 8.56411L9.57969 2.66255C9.69477 2.55781 9.84478 2.49976 10.0004 2.49976C10.156 2.49976 10.306 2.55781 10.4211 2.66255L16.6711 8.56411C16.7356 8.62269 16.7871 8.69409 16.8223 8.77373C16.8576 8.85338 16.8758 8.93951 16.8758 9.02661V16.2501C16.8758 16.4158 16.8099 16.5748 16.6927 16.692C16.5755 16.8092 16.4165 16.8751 16.2508 16.8751H12.5C12.3342 16.8751 12.1753 16.8092 12.0581 16.692C11.9408 16.5748 11.875 16.4158 11.875 16.2501Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
