import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { containerTheme } from './text-input.style'

export const TextInputContainer = forwardRef(function TextInputContainer(
  props: TextInputContainerProps,
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
      data-error={error}
      data-disabled={disabled}
      className={cx(containerTheme, className)}
      {...htmlProps}
    >
      {children}
    </div>
  )
})

export type TextInputContainerProps = ComponentPropsWithoutRef<'div'> & {
  error?: boolean
  disabled?: boolean
}
