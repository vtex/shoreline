import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconHeartbeat = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M18 11.9998H16.309C16.12 11.9998 15.946 12.1068 15.862 12.2758L14.447 15.1048C14.263 15.4738 13.737 15.4738 13.553 15.1048L10.43 8.86079C10.249 8.49879 9.735 8.49079 9.543 8.84679L7.984 11.7368C7.896 11.8988 7.727 11.9998 7.544 11.9998H3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.52344 9C4.76044 5.507 8.08344 3 12.0004 3C16.9714 3 21.0004 7.029 21.0004 12C21.0004 16.971 16.9714 21 12.0004 21C8.08344 21 4.76044 18.493 3.52344 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
