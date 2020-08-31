import React from 'react'
import { Icon, IconProps } from '@vtex-components/icon'

export function IconCaretMock(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M10 16L14 12L10 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}
