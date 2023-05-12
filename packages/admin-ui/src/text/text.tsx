import type { ComponentPropsWithRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { textTheme } from './text.css'

export const Text = forwardRef(function Text(
  props: TextProps,
  ref: Ref<HTMLSpanElement>
) {
  const {
    children,
    className = '',
    variant = 'body',
    tone = 'primary',
    ...htmlProps
  } = props

  return (
    <span
      ref={ref}
      data-variant={variant}
      data-tone={tone}
      className={cx(textTheme, className)}
      {...htmlProps}
    >
      {children}
    </span>
  )
})

export type TextProps = ComponentPropsWithRef<'span'> & {
  tone?: 'primary' | 'secondary' | 'info' | 'positive' | 'critical' | 'warning'
  variant?:
    | 'pageTitle'
    | 'display'
    | 'title1'
    | 'title2'
    | 'action1'
    | 'action2'
    | 'body'
    | 'detail'
}
