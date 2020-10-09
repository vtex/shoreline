import { forwardRef } from '@vtex-components/utils'
import React, { Ref } from 'react'

import { IconWithDirection, IconWithDirectionProps } from './IconWithDirection'

export const IconCaretBig = forwardRef(
  (props: IconWithDirectionProps, ref: Ref<SVGSVGElement>) => (
    <IconWithDirection {...props} ref={ref}>
      <path
        d="M21 16.5L11.989 7.5L3 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWithDirection>
  )
)
