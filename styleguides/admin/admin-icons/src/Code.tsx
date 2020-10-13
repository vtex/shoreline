import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconCode = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M6.56055 12L8.60055 14.04"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.60055 9.95996L6.56055 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4023 14.042L17.4433 12L15.4023 9.95801"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9303 8.5L11.0703 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3H18C19.657 3 21 4.343 21 6V18C21 19.657 19.657 21 18 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
