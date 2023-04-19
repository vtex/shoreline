import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { titleTheme } from './card.css'

export const CardTitle = forwardRef(
  (props: CardTitleProps, ref: Ref<HTMLParagraphElement>) => {
    const { className = '', children, ...restProps } = props

    return (
      <h1
        ref={ref}
        className={cx('__admin-ui-card-nested-title', titleTheme, className)}
        {...restProps}
      >
        {children}
      </h1>
    )
  }
)

type CardTitleProps = ComponentPropsWithoutRef<'h1'>

export type { CardTitleProps }
