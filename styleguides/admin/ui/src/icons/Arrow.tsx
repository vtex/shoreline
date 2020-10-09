import React, { Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

import { IconWithDirection, IconWithDirectionProps } from './IconWithDirection'

export const IconArrow = forwardRef(
  (props: IconWithDirectionProps, ref: Ref<SVGSVGElement>) => (
    <IconWithDirection {...props} ref={ref}>
      <path
        d="M12.01 4.51025V19.5003"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.02301 10.514L12 4.49805L17.977 10.514"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWithDirection>
  )
)
