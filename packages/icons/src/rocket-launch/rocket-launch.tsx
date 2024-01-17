import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconRocketLaunch = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconRocketLaunch(props, ref) {
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
        d="M7.5 14.375C7.5 14.375 6.875 16.875 3.125 16.875C3.125 13.125 5.625 12.5 5.625 12.5"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9305 8.8195C16.8055 6.9445 16.9227 4.71403 16.8641 3.7195C16.8543 3.56792 16.7897 3.42508 16.6823 3.31767C16.5749 3.21027 16.432 3.14565 16.2805 3.1359C15.2859 3.07731 13.057 3.19293 11.1805 5.0695L6.25 9.99996L10 13.75L14.9305 8.8195Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.625 5.625H5.80855C5.64301 5.62508 5.48426 5.69082 5.36714 5.80781L2.68355 8.49141C2.60162 8.57352 2.54415 8.67682 2.51759 8.78974C2.49102 8.90265 2.49641 9.02074 2.53314 9.13077C2.56987 9.2408 2.6365 9.33844 2.72556 9.41275C2.81463 9.48707 2.92263 9.53513 3.03746 9.55156L6.24996 10"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.375 9.375V14.1914C14.3749 14.3569 14.3092 14.5157 14.1922 14.6328L11.5086 17.3164C11.4265 17.3983 11.3232 17.4558 11.2103 17.4824C11.0973 17.5089 10.9793 17.5036 10.8692 17.4668C10.7592 17.4301 10.6616 17.3635 10.5872 17.2744C10.5129 17.1853 10.4649 17.0773 10.4484 16.9625L10 13.75"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
