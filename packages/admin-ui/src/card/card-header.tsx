import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { headerTheme } from './card.style'
import { cx } from '@vtex/admin-ui-core'

export const CardHeader = forwardRef(
  (props: CardHeaderProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...restProps } = props

    return (
      <div ref={ref} className={cx(headerTheme, className)} {...restProps} />
    )
  }
)

type CardHeaderProps = ComponentPropsWithoutRef<'div'>

export type { CardHeaderProps }
