import { cx } from '@vtex/admin-ui-core'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { flexSpacerTheme } from './flex.style'

export const FlexSpacer = forwardRef(
  (props: FlexSpacerProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...divProps } = props

    return (
      <div ref={ref} className={cx(className, flexSpacerTheme)} {...divProps} />
    )
  }
)

export type FlexSpacerProps = ComponentPropsWithoutRef<'div'>
