import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { imageTheme } from './card.style'
import { cx } from '@vtex/admin-ui-core'

export const CardImage = forwardRef(
  (props: CardImageProps, ref: Ref<HTMLImageElement>) => {
    const { className = '', alt = '', ...restProps } = props

    return (
      <img
        ref={ref}
        alt={alt}
        className={cx(imageTheme, className)}
        {...restProps}
      />
    )
  }
)

type CardImageProps = ComponentPropsWithoutRef<'img'>

export type { CardImageProps }
