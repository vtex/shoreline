import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconOnlineStore = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M10 20H5C3.895 20 3 19.105 3 18V7.5C3 6.672 3.672 6 4.5 6H17.5C18.328 6 19 6.672 19 7.5V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.191 19.928H17.299L15.447 21.764C14.937 22.269 14.072 21.908 14.072 21.191V13.808C14.072 13.09 14.941 12.729 15.449 13.238L20.762 18.551C21.27 19.059 20.911 19.928 20.191 19.928V19.928Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
