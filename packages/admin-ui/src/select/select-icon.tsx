import React from 'react'
import type { IconProps } from '@vtex/phosphor-icons'
import { tag } from '@vtex/admin-ui-react'

export function SelectIcon(props: IconProps) {
  return (
    <tag.svg
      {...props}
      width="1.25rem"
      height="1.25rem"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.125 12.25L10 15.375L6.875 12.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 7.75151L10 4.62651L13.125 7.75151"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </tag.svg>
  )
}
