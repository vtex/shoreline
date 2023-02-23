import React, { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, Ref } from 'react'

import { Stack } from '../stack'

export const CardInfo = forwardRef(
  (props: CardInfoProps, ref: Ref<HTMLDivElement>) => {
    const { children, ...restProps } = props

    return (
      <div ref={ref} {...restProps}>
        <Stack direction="row" space="$space-3">
          {children}
        </Stack>
      </div>
    )
  }
)

type CardInfoProps = ComponentPropsWithoutRef<'div'>

export type { CardInfoProps }
