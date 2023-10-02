import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPencil = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPencil(props, ref) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.384 3.30175L16.6983 6.61381L7.18933 16.1251H3.875V12.8108L13.384 3.30175ZM12.412 2.15241C12.6699 1.89474 13.0195 1.75 13.384 1.75C13.7485 1.75 14.0981 1.89474 14.3559 2.15241L17.8473 5.64147C18.105 5.8993 18.2501 6.24926 18.2501 6.61377C18.2501 6.97829 18.1054 7.32789 17.8477 7.58573L8.21321 17.2226C7.95554 17.4799 7.60594 17.6249 7.24175 17.6251H3.75C3.38533 17.6251 3.03559 17.4802 2.77773 17.2224C2.51987 16.9645 2.375 16.6148 2.375 16.2501V12.7587C2.37517 12.3945 2.51981 12.0449 2.77719 11.7873L12.412 2.15241Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0947 4.46967C10.3876 4.17678 10.8624 4.17678 11.1553 4.46967L15.5303 8.84467C15.8232 9.13756 15.8232 9.61244 15.5303 9.90533C15.2374 10.1982 14.7626 10.1982 14.4697 9.90533L10.0947 5.53033C9.80178 5.23744 9.80178 4.76256 10.0947 4.46967Z"
        fill="currentColor"
      />
    </svg>
  )
})
