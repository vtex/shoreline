import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { headerTheme } from './card.css'
import { cx } from '@vtex/admin-ui-core'

export const CardHeader = forwardRef(
  (props: CardHeaderProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...restProps } = props

    return (
      <div ref={ref} className={cx(className, headerTheme)} {...restProps} />
    )
  }
)

type CardHeaderProps = ComponentPropsWithoutRef<'div'>

export type { CardHeaderProps }
