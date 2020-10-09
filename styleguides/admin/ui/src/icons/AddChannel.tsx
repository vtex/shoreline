import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconAddChannel = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M5 16H4.444C3.647 16 3 15.353 3 14.556V4.444C3 3.647 3.647 3 4.444 3H14.555C15.353 3 16 3.647 16 4.444V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.556 21H9.444C8.647 21 8 20.353 8 19.556V9.444C8 8.647 8.647 8 9.444 8H19.555C20.353 8 21 8.647 21 9.444V19.555C21 20.353 20.353 21 19.556 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14.5 12V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 14.5H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
