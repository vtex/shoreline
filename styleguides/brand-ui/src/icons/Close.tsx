import React from 'react'
import { Icon, IconProps } from '@vtex-components/icon'

export function IconClose(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M8 8L16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8L8 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}
