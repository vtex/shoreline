import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconProducts = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M9.16429 10.1455C9.30762 10.2888 9.30762 10.5212 9.16429 10.6645C9.02097 10.8079 8.7886 10.8079 8.64528 10.6645C8.50196 10.5212 8.50196 10.2888 8.64528 10.1455C8.7886 10.0022 9.02097 10.0022 9.16429 10.1455"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.71 6.29L18.92 13.5C19.692 14.272 19.692 15.524 18.92 16.296L14.796 20.42C14.024 21.192 12.772 21.192 12 20.42L4.79 13.21C4.605 13.025 4.5 12.773 4.5 12.511V6.989C4.5 6.443 4.943 6 5.489 6H11.012C11.274 6 11.525 6.104 11.71 6.29V6.29Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 10L12.994 3.577C12.619 3.207 12.115 3 11.589 3H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
