import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { titleTheme } from './card.css'

export const CardTitle = forwardRef(
  (props: CardTitleProps, ref: Ref<HTMLParagraphElement>) => {
    const { className = '', ...restProps } = props

    return (
      <p
        ref={ref}
        className={cx('__admin-ui-card-nested-title', titleTheme, className)}
        {...restProps}
      />
    )
  }
)

type CardTitleProps = ComponentPropsWithoutRef<'p'>

export type { CardTitleProps }
