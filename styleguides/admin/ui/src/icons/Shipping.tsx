import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconShipping = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.926 15.9992V8.00119C20.926 7.28619 20.545 6.62619 19.926 6.26919L13 2.27019C12.381 1.91319 11.619 1.91319 11 2.27019L4.07397 6.26919C3.45497 6.62619 3.07397 7.28719 3.07397 8.00119V15.9982C3.07397 16.7132 3.45497 17.3732 4.07397 17.7302L11 21.7302C11.619 22.0872 12.381 22.0872 13 21.7302L19.926 17.7312C20.545 17.3742 20.926 16.7132 20.926 15.9992Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.16998 12.6304L9.16998 14.3704"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.34198 7.00098L12 12L20.658 7.00098"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.33 9.50002L7.53998 4.27002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
