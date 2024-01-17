import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconShoppingCartSimple = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconShoppingCartSimple(props, ref) {
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
        d="M6.625 17.9688C7.22906 17.9688 7.71875 17.4791 7.71875 16.875C7.71875 16.2709 7.22906 15.7812 6.625 15.7812C6.02094 15.7812 5.53125 16.2709 5.53125 16.875C5.53125 17.4791 6.02094 17.9688 6.625 17.9688Z"
        fill="currentColor"
      />
      <path
        d="M14.75 17.9688C15.3541 17.9688 15.8438 17.4791 15.8438 16.875C15.8438 16.2709 15.3541 15.7812 14.75 15.7812C14.1459 15.7812 13.6562 16.2709 13.6562 16.875C13.6562 17.4791 14.1459 17.9688 14.75 17.9688Z"
        fill="currentColor"
      />
      <path
        d="M3.67891 5.625H17.875L15.6469 12.868C15.5682 13.1235 15.4096 13.3471 15.1945 13.5058C14.9793 13.6646 14.7189 13.7501 14.4516 13.75H6.94297C6.6713 13.7501 6.40699 13.6617 6.19005 13.4982C5.9731 13.3347 5.81533 13.1049 5.74063 12.8437L2.91484 2.95312C2.87751 2.82259 2.79868 2.70777 2.69029 2.62601C2.5819 2.54426 2.44983 2.50003 2.31406 2.5H1"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
