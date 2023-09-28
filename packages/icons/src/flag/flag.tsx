import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconFlag = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconFlag(props, ref) {
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
        d="M13.4093 4.22337C14.3241 4.33267 15.2873 4.13309 16.384 3.18322C16.6059 2.99101 16.9196 2.94597 17.1866 3.06796C17.4537 3.18996 17.625 3.45655 17.625 3.75015V13.1251C17.625 13.3427 17.5305 13.5496 17.366 13.6921C15.9627 14.9074 14.5822 15.2492 13.2313 15.0878C11.9696 14.9371 10.7772 14.3468 9.72393 13.8253L9.66733 13.7973C8.54692 13.2428 7.5719 12.7691 6.59072 12.6519C5.74861 12.5513 4.86552 12.7124 3.875 13.4796V16.8751C3.875 17.2893 3.53921 17.6251 3.125 17.6251C2.71078 17.6251 2.375 17.2893 2.375 16.8751V13.1297C2.37498 13.1269 2.37498 13.1241 2.375 13.1212V3.75005C2.375 3.53245 2.4695 3.32558 2.63398 3.18312C4.03725 1.96776 5.41784 1.62604 6.76865 1.78742C8.03044 1.93816 9.22279 2.52845 10.2761 3.0499C10.295 3.05926 10.3139 3.0686 10.3327 3.07792C11.4531 3.63243 12.4281 4.10615 13.4093 4.22337ZM3.875 11.6984C4.85265 11.1845 5.81802 11.0489 6.76865 11.1625C8.03044 11.3132 9.22278 11.9035 10.2761 12.4249C10.295 12.4343 10.3138 12.4437 10.3327 12.453C11.4531 13.0075 12.4281 13.4812 13.4093 13.5984C14.2514 13.699 15.1345 13.5379 16.125 12.7707V5.17685C15.1473 5.69076 14.182 5.82635 13.2313 5.71278C11.9695 5.56204 10.7772 4.97175 9.72392 4.4503C9.70501 4.44093 9.68614 4.43159 9.66732 4.42228C8.54691 3.86776 7.57189 3.39405 6.59071 3.27683C5.7486 3.17622 4.86552 3.33734 3.875 4.10451V11.6984Z"
        fill="currentColor"
      />
    </svg>
  )
})
