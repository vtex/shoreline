import { forwardRef } from '@vtex-components/utils'
import React, { Ref } from 'react'

import { IconWithDirection, IconWithDirectionProps } from './IconWithDirection'

export const IconCaret = forwardRef(
  (props: IconWithDirectionProps, ref: Ref<SVGSVGElement>) => (
    <IconWithDirection {...props} ref={ref}>
      <path
        d="M16 14L12 10L8 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWithDirection>
  )
)
