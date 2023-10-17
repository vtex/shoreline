import { cx } from '@vtex/admin-ui-core'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { inputTheme } from './text-input.style'

export const TextInputElement = forwardRef(function TextInputElement(
  props: TextInputElementProps,
  ref: Ref<HTMLInputElement>
) {
  const { className = '', ...htmlProps } = props

  return (
    <input ref={ref} className={cx(inputTheme, className)} {...htmlProps} />
  )
})

export type TextInputElementProps = ComponentPropsWithoutRef<'input'>
