import { cx } from '@vtex/admin-ui-core'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { inputTheme } from './text-area.style'

export const TextAreaElement = forwardRef(function TextAreaElement(
  props: TextAreaElementProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const { className = '', ...htmlProps } = props

  return (
    <textarea ref={ref} className={cx(inputTheme, className)} {...htmlProps} />
  )
})

export type TextAreaElementProps = ComponentPropsWithoutRef<'textarea'>
