import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconCatalog = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2859 18.9759L17.0501 8.87066C16.965 8.48498 16.6231 8.21045 16.2282 8.21045H7.07788C6.68293 8.21045 6.34104 8.48498 6.25599 8.87066L4.0202 18.9759C3.90399 19.5014 4.30399 19.9999 4.84209 19.9999H18.464C19.0021 19.9999 19.4021 19.5014 19.2859 18.9759V18.9759Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7575 8.21053V6.10526V6.10526V6.10526C13.7575 4.94232 12.8151 4 11.6522 4H11.6513C10.4884 4 9.54608 4.94232 9.54608 6.10526V6.10526V6.10526V8.21053"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8392 8.49658L14.2961 19.9997"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
