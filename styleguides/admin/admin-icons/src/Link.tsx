import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconLink = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M17.445 12.7781L19.778 10.4451C21.496 8.72709 21.496 5.94109 19.778 4.22209V4.22209C18.06 2.50409 15.274 2.50409 13.555 4.22209L11.222 6.55509"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.89001 15.1101L15.11 8.89014"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.55497 11.2222L4.22197 13.5552C2.50397 15.2732 2.50397 18.0592 4.22197 19.7782V19.7782C5.93997 21.4962 8.72597 21.4962 10.445 19.7782L12.778 17.4452"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
