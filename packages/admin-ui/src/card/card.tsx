import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './card.style'
import { Stack } from '../stack'

export const Card = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: style.card,
    children: <Stack space="$space-6">{children}</Stack>,
  })
})

export type CardProps = ComponentPropsWithRef<typeof Card>
