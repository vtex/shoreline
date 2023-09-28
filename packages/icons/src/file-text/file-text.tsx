import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconFileText = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconFileText(props, ref) {
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
        d="M4.49951 3.25V16.75H15.5001V7.18566L11.5645 3.25H4.49951ZM3.40224 2.15273C3.6601 1.89487 4.00984 1.75 4.37451 1.75H11.8751C12.074 1.75 12.2648 1.82902 12.4055 1.96967L16.7805 6.34467C16.9211 6.48532 17.0001 6.67609 17.0001 6.875V16.875C17.0001 17.0556 16.9646 17.2344 16.8955 17.4012C16.8264 17.568 16.7251 17.7196 16.5974 17.8473C16.4697 17.975 16.3181 18.0762 16.1513 18.1453C15.9845 18.2144 15.8057 18.25 15.6251 18.25H4.37451C4.00984 18.25 3.6601 18.1051 3.40224 17.8473C3.14438 17.5894 2.99951 17.2397 2.99951 16.875V3.125C2.99951 2.76033 3.14438 2.41059 3.40224 2.15273Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8751 1.75C12.2893 1.75 12.625 2.08579 12.625 2.5V6.125H16.2506C16.6648 6.125 17.0001 6.46079 17.0001 6.875C17.0001 7.28921 16.6648 7.625 16.2506 7.625H11.875C11.4608 7.625 11.125 7.28921 11.125 6.875V2.5C11.125 2.08579 11.4609 1.75 11.8751 1.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 10.625C6.75 10.2108 7.08579 9.875 7.5 9.875H12.5C12.9142 9.875 13.25 10.2108 13.25 10.625C13.25 11.0392 12.9142 11.375 12.5 11.375H7.5C7.08579 11.375 6.75 11.0392 6.75 10.625Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 13.125C6.75 12.7108 7.08579 12.375 7.5 12.375H12.5C12.9142 12.375 13.25 12.7108 13.25 13.125C13.25 13.5392 12.9142 13.875 12.5 13.875H7.5C7.08579 13.875 6.75 13.5392 6.75 13.125Z"
        fill="currentColor"
      />
    </svg>
  )
})
