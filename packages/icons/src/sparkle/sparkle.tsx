import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconSparkle = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconSparkle(props, ref) {
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
        d="M6.31543 13.3179L2.27949 11.8335C2.16082 11.7897 2.05842 11.7106 1.9861 11.6068C1.91377 11.503 1.875 11.3795 1.875 11.253C1.875 11.1265 1.91377 11.0031 1.9861 10.8993C2.05842 10.7955 2.16082 10.7164 2.27949 10.6726L6.31543 9.18818C6.39946 9.15741 6.47578 9.10869 6.53906 9.04541C6.60234 8.98213 6.65106 8.90581 6.68183 8.82177L8.16621 4.78584C8.21001 4.66716 8.28914 4.56477 8.39293 4.49244C8.49671 4.42012 8.62018 4.38135 8.74668 4.38135C8.87318 4.38135 8.99664 4.42012 9.10043 4.49244C9.20421 4.56477 9.28334 4.66716 9.32715 4.78584L10.8115 8.82177C10.8423 8.90581 10.891 8.98213 10.9543 9.04541C11.0176 9.10869 11.0939 9.15741 11.1779 9.18818L15.2139 10.6726C15.3325 10.7164 15.4349 10.7955 15.5073 10.8993C15.5796 11.0031 15.6184 11.1265 15.6184 11.253C15.6184 11.3795 15.5796 11.503 15.5073 11.6068C15.4349 11.7106 15.3325 11.7897 15.2139 11.8335L11.1779 13.3179C11.0939 13.3486 11.0176 13.3974 10.9543 13.4606C10.891 13.5239 10.8423 13.6002 10.8115 13.6843L9.32715 17.7202C9.28334 17.8389 9.20421 17.9413 9.10043 18.0136C8.99664 18.0859 8.87318 18.1247 8.74668 18.1247C8.62018 18.1247 8.49671 18.0859 8.39293 18.0136C8.28914 17.9413 8.21001 17.8389 8.16621 17.7202L6.68183 13.6843C6.65106 13.6002 6.60234 13.5239 6.53906 13.4606C6.47578 13.3974 6.39946 13.3486 6.31543 13.3179Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 1.25V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 5.625V8.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.875 3.125H15.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 6.875H18.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
