import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconUser = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M14.4749 4.52513C15.8417 5.89197 15.8417 8.10804 14.4749 9.47488C13.108 10.8417 10.892 10.8417 9.52513 9.47488C8.15829 8.10804 8.15829 5.89197 9.52513 4.52513C10.892 3.15829 13.108 3.15829 14.4749 4.52513"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 18.4998V19.4998C4 20.0518 4.448 20.4998 5 20.4998H19C19.552 20.4998 20 20.0518 20 19.4998V18.4998C20 15.4738 16.048 13.5078 12 13.5078C7.952 13.5078 4 15.4738 4 18.4998Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
