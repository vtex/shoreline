import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTruck = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTruck(props, ref) {
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
        d="M13.75 6.25H17.0766C17.2011 6.24994 17.3228 6.28709 17.4261 6.35669C17.5294 6.42629 17.6095 6.52517 17.6562 6.64063L18.75 9.375"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.25 11.25H13.75"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.375 16.875C15.4105 16.875 16.25 16.0355 16.25 15C16.25 13.9645 15.4105 13.125 14.375 13.125C13.3395 13.125 12.5 13.9645 12.5 15C12.5 16.0355 13.3395 16.875 14.375 16.875Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.625 16.875C6.66053 16.875 7.5 16.0355 7.5 15C7.5 13.9645 6.66053 13.125 5.625 13.125C4.58947 13.125 3.75 13.9645 3.75 15C3.75 16.0355 4.58947 16.875 5.625 16.875Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 15H7.5"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 9.375H18.75V14.375C18.75 14.5408 18.6842 14.6997 18.5669 14.8169C18.4497 14.9342 18.2908 15 18.125 15H16.25"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 15H1.875C1.70924 15 1.55027 14.9342 1.43306 14.8169C1.31585 14.6997 1.25 14.5408 1.25 14.375V5.625C1.25 5.45924 1.31585 5.30027 1.43306 5.18306C1.55027 5.06585 1.70924 5 1.875 5H13.75V13.232"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
