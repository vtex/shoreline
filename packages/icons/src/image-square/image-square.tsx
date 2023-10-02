import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconImageSquare = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconImageSquare(props, ref) {
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
        d="M3.875 3.875V16.125H16.125V3.875H3.875ZM2.375 3.75C2.375 2.99061 2.99061 2.375 3.75 2.375H16.25C17.0094 2.375 17.625 2.99061 17.625 3.75V16.25C17.625 17.0094 17.0094 17.625 16.25 17.625H3.75C2.99061 17.625 2.375 17.0094 2.375 16.25V3.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8C7.77614 8 8 7.77614 8 7.5C8 7.22386 7.77614 7 7.5 7ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4373 8.9263L4.95907 17.4053C4.66619 17.6982 4.19131 17.6982 3.89841 17.4054C3.6055 17.1125 3.60548 16.6376 3.89836 16.3447L12.4645 7.77778C12.4644 7.77787 12.4646 7.77769 12.4645 7.77778C12.5921 7.65006 12.744 7.54847 12.9108 7.47932C13.0777 7.41013 13.2566 7.37451 13.4373 7.37451C13.618 7.37451 13.7969 7.41013 13.9638 7.47932C14.1308 7.54852 14.2824 7.64994 14.4101 7.77778L17.4052 10.7736C17.6981 11.0666 17.698 11.5415 17.4051 11.8343C17.1121 12.1272 16.6373 12.1271 16.3444 11.8342L13.4373 8.9263Z"
        fill="currentColor"
      />
    </svg>
  )
})
