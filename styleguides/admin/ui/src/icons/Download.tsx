import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconDownload = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M12 17L12 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 21L4 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 12L11.999 17.001L6.99902 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
