import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconPrinter = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => {
    const { viewBox = '0 0 14 14', ...restProps } = props

    return (
      <Icon viewBox={viewBox} {...restProps} ref={ref}>
        <path
          d="M3.6665 4.33333V1.66667C3.6665 1.29867 3.96517 1 4.33317 1H9.6665C10.0345 1 10.3332 1.29867 10.3332 1.66667V4.33333"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.66667 10.333H2.33333C1.59667 10.333 1 9.73634 1 8.99967V5.66634C1 4.92967 1.59667 4.33301 2.33333 4.33301H11.6667C12.4033 4.33301 13 4.92967 13 5.66634V8.99967C13 9.73634 12.4033 10.333 11.6667 10.333H10.3333"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.6665 8.2002H10.3332V12.3335C10.3332 12.7015 10.0345 13.0002 9.6665 13.0002H4.33317C3.96517 13.0002 3.6665 12.7015 3.6665 12.3335V8.2002Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.6665 6.33301H4.33317"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>
    )
  }
)
