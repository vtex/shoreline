import React from 'react'
import { Icon, IconProps } from '@vtex-components/icon'

export const IconExit = (props: IconProps) => {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}
