import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconGearSix = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconGearSix(props, ref) {
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
        d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1603 16.1023C10.0556 16.1023 9.95011 16.1023 9.84777 16.1023L7.34386 17.5C6.36912 17.1721 5.46501 16.6632 4.67902 16L4.66964 13.1875C4.61417 13.1 4.56183 13.0117 4.51339 12.9211L2.02355 11.5031C1.82744 10.5112 1.82744 9.4904 2.02355 8.49844L4.51105 7.08438C4.56183 6.99453 4.61418 6.90547 4.6673 6.81797L4.6798 4.00547C5.46508 3.34035 6.36895 2.82957 7.34386 2.5L9.84386 3.89766C9.94855 3.89766 10.054 3.89766 10.1564 3.89766L12.6564 2.5C13.6311 2.82788 14.5352 3.33679 15.3212 4L15.3306 6.8125C15.3861 6.9 15.4384 6.98828 15.4868 7.07891L17.9751 8.49609C18.1712 9.48806 18.1712 10.5088 17.9751 11.5008L15.4876 12.9148C15.4368 13.0047 15.3845 13.0938 15.3314 13.1813L15.3189 15.9938C14.5341 16.659 13.6308 17.17 12.6564 17.5L10.1603 16.1023Z"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
