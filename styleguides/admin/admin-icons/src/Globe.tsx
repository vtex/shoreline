import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconGlobe = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M3 12H7.172C8.734 12 10 10.734 10 9.17204V9.17204C10 8.42204 9.702 7.70204 9.172 7.17204L6.717 4.71704"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2921 18.438L16.5151 15.773C16.1931 15.29 15.6521 15 15.0721 15V15C14.4151 15 13.8151 14.629 13.5211 14.041L13.3881 13.775C13.1441 13.287 13.1441 12.712 13.3881 12.224L14.5211 9.958C14.8141 9.371 15.4151 9 16.0721 9H20.4801"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3C16.982 3 21 7.018 21 12C21 16.982 16.982 21 12 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21C7.018 21 3 16.982 3 12C3 7.018 7.018 3 12 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
