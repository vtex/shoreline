import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { containerTheme } from './text-area.style'

export const TextAreaContainer = forwardRef(function TextAreaContainer(
  props: TextAreaContainerProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    error = false,
    disabled = false,
    className = '',
    children,
    ...htmlProps
  } = props

  return (
    <div
      ref={ref}
      className={cx(containerTheme, className)}
      data-error={error}
      data-disabled={disabled}
      {...htmlProps}
    >
      {children}
    </div>
  )
})

export type TextAreaContainerProps = ComponentPropsWithoutRef<'div'> & {
  error?: boolean
  disabled?: boolean
}
