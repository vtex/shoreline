import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './card.style'

export const Card = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: style.card,
    children,
  })
})

export type CardProps = ComponentPropsWithRef<typeof Card>
