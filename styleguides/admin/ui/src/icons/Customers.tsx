import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconCustomers = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M2 19C2 16.8 3.8 15 6 15H10C12.2 15 14 16.8 14 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4997 6.00003C11.8997 7.40003 11.8997 9.60003 10.4997 10.9C9.09968 12.2 6.89968 12.3 5.59968 10.9C4.29968 9.50003 4.19968 7.40003 5.49968 6.00003C6.79968 4.60003 9.09968 4.70003 10.4997 6.00003"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 14H19C20.7 14 22 15.3 22 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2999 6.70002C20.2999 7.70002 20.2999 9.30002 19.2999 10.2C18.2999 11.1 16.6999 11.2 15.7999 10.2C14.8999 9.20002 14.7999 7.60002 15.7999 6.70002C16.6999 5.80002 18.2999 5.80002 19.2999 6.70002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
