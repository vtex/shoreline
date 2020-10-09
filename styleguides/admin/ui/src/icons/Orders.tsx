import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconOrders = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.20139 14.1262L5.68359 6.52637H18.1681C18.8118 6.52637 19.2834 7.1672 19.1272 7.83006L17.7943 13.4853C17.5916 14.3443 16.9034 14.9757 16.0728 15.0638L9.33322 15.7791C8.32861 15.885 7.41002 15.1729 7.20139 14.1262Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.68421 6.52632L5.22307 4H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0502 19.271C16.8801 19.271 16.742 19.4092 16.7437 19.5793C16.7437 19.7494 16.8818 19.8875 17.0519 19.8875C17.222 19.8875 17.3601 19.7494 17.3601 19.5793C17.3593 19.4092 17.2212 19.271 17.0502 19.271"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.63073 19.2706C8.46063 19.2706 8.32252 19.4087 8.32421 19.5788C8.32252 19.7498 8.46147 19.8879 8.63158 19.8879C8.80168 19.8879 8.93979 19.7498 8.93979 19.5797C8.93979 19.4087 8.80168 19.2706 8.63073 19.2706"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
