import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { textareaStyle } from './textarea.css'

export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  function Textarea(props, ref) {
    const {
      error = false,
      disabled = false,
      className = '',
      children,
      value = '',
      maxLength,
      ...htmlProps
    } = props

    const charCount = String(value).length

    return (
      <div
        ref={ref}
        data-sl-textarea-container
        className={cx(textareaStyle, className)}
      >
        <textarea
          data-sl-textarea
          data-error={error}
          data-disabled={disabled}
          disabled={disabled}
          className={textareaStyle}
          maxLength={maxLength}
          {...htmlProps}
        />
        {maxLength && (
          <p data-sl-textarea-char-counter className={textareaStyle}>
            {charCount} / {maxLength}
          </p>
        )}
      </div>
    )
  }
)

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  error?: boolean
}
