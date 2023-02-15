import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { contentTheme } from './card.css'
import { cx } from '@vtex/admin-ui-core'

export const CardContent = forwardRef(
  (props: CardContentProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...restProps } = props

    return (
      <div ref={ref} className={cx(className, contentTheme)} {...restProps} />
    )
  }
)

type CardContentProps = ComponentPropsWithoutRef<'div'>

export type { CardContentProps }
