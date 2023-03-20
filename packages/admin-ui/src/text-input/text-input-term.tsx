import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { termTheme } from './text-input.css'

export const TextInputTerm = forwardRef(function TextInputTerm(
  props: TextInputTermProps,
  ref: Ref<HTMLDivElement>
) {
  const { type, children, className = '', ...htmlProps } = props

  return (
    <div
      ref={ref}
      data-type={type}
      className={cx(termTheme, className)}
      {...htmlProps}
    >
      {children}
    </div>
  )
})

export type TextInputTermProps = ComponentPropsWithoutRef<'div'> & {
  type?: 'prefix' | 'suffix'
}
