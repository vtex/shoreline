import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconDashboard = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M9.33331 16.1081V8.32434C9.33331 7.84693 9.73154 7.45947 10.2222 7.45947H14.6666V16.1081"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 7.45946V4.86486C14.6667 4.38746 15.0649 4 15.5556 4H19.1111C19.6018 4 20 4.38746 20 4.86486V15.2432C20 15.7206 19.6018 16.1081 19.1111 16.1081H4.88889C4.39822 16.1081 4 15.7206 4 15.2432V11.7838C4 11.3064 4.39822 10.9189 4.88889 10.9189H9.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 19.5672H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
