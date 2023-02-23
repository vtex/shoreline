import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { cardTheme } from './card.css'
import { cx } from '@vtex/admin-ui-core'

export const Card = forwardRef((props: CardProps, ref: Ref<HTMLDivElement>) => {
  const { children, className = '', ...restProps } = props

  return (
    <div ref={ref} className={cx(cardTheme, className)} {...restProps}>
      {children}
    </div>
  )
})

type CardProps = ComponentPropsWithoutRef<'div'>

export type { CardProps }
