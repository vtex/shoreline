import React, { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, Ref } from 'react'

import { Stack } from '../stack'
import { Bleed } from '../bleed'

export const CardActions = forwardRef(
  (props: CardActionsProps, ref: Ref<HTMLDivElement>) => {
    const { children, ...restProps } = props

    return (
      <div ref={ref} {...restProps}>
        <Bleed top="$space-2" bottom="$space-2">
          <Stack direction="row" space="$space-3">
            {children}
          </Stack>
        </Bleed>
      </div>
    )
  }
)

type CardActionsProps = ComponentPropsWithoutRef<'div'>

export type { CardActionsProps }
