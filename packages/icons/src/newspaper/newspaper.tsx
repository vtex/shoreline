import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconNewspaper = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconNewspaper(props, ref) {
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
        d="M6.75 8.75C6.75 8.33579 7.08579 8 7.5 8H13.75C14.1642 8 14.5 8.33579 14.5 8.75C14.5 9.16421 14.1642 9.5 13.75 9.5H7.5C7.08579 9.5 6.75 9.16421 6.75 8.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 11.25C6.75 10.8358 7.08579 10.5 7.5 10.5H13.75C14.1642 10.5 14.5 10.8358 14.5 11.25C14.5 11.6642 14.1642 12 13.75 12H7.5C7.08579 12 6.75 11.6642 6.75 11.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 5.125V14.375C4.5 14.5451 4.47832 14.713 4.4365 14.875H16.25C16.3826 14.875 16.5098 14.8223 16.6036 14.7286C16.6973 14.6348 16.75 14.5076 16.75 14.375V5.125H4.5ZM2.5 16.375H16.25C16.7804 16.375 17.2891 16.1643 17.6642 15.7892C18.0393 15.4141 18.25 14.9054 18.25 14.375V5C18.25 4.63533 18.1051 4.28559 17.8473 4.02773C17.5894 3.76987 17.2397 3.625 16.875 3.625H4.375C4.01033 3.625 3.66059 3.76987 3.40273 4.02773C3.14487 4.28559 3 4.63533 3 5V14.375C3 14.5076 2.94732 14.6348 2.85355 14.7286C2.75978 14.8223 2.63261 14.875 2.5 14.875C2.08579 14.875 1.75 15.2108 1.75 15.625C1.75 16.0392 2.08579 16.375 2.5 16.375Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 6.125C1.66421 6.125 2 6.46079 2 6.875V14.375C2 14.5076 2.05268 14.6348 2.14645 14.7286C2.24021 14.8223 2.36739 14.875 2.5 14.875C2.91421 14.875 3.25 15.2108 3.25 15.625C3.25 16.0392 2.91421 16.375 2.5 16.375C1.96957 16.375 1.46086 16.1643 1.08579 15.7892C0.710714 15.4141 0.5 14.9054 0.5 14.375V6.875C0.5 6.46079 0.835786 6.125 1.25 6.125Z"
        fill="currentColor"
      />
    </svg>
  )
})
