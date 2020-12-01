import React, { forwardRef, Ref } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { Text } from '../Text'
import { Label } from '../Label'
import { Overridable } from '../../types'
import { Box } from '../Box'
import { stylesOf } from '../../system'

export const TextArea = forwardRef(function Textarea(
  props: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const {
    id,
    label,
    styleOverrides,
    helperText,
    charLimit,
    value = '',
    error = false,
    onChange,
    errorMessage,
    ...textareaProps
  } = props

  const message = error ? errorMessage : helperText

  const className = useClassName({
    props: {
      styles: {
        ...styleOverrides,
      },
    },
    themeKey: 'components.textArea.default',
  })

  return (
    <Box themeKey={`components.textArea.container${error ? '-error' : ''}`}>
      <textarea
        className={className}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        value={value}
        onChange={onChange}
        {...textareaProps}
      />
      <Label
        htmlFor={id}
        styleOverrides={stylesOf('components.textArea.floating-label')}
      >
        {label}
      </Label>
      {(message || !!charLimit) && (
        <Box themeKey="components.textArea.text-container">
          {message ? (
            <Text variant="small" feedback={error ? 'danger' : 'secondary'}>
              {message}
            </Text>
          ) : (
            <div>{/** spacer element */}</div>
          )}
          {charLimit && (
            <Text variant="small" styleOverrides={{ color: 'muted.0' }}>
              {`${value.toString().length}/${charLimit}`}
            </Text>
          )}
        </Box>
      )}
    </Box>
  )
})

export interface TextAreaProps
  extends Overridable,
    Omit<
      React.ComponentPropsWithoutRef<'textarea'>,
      'value' | 'onChange' | 'maxLength' | 'onClear'
    > {
  /** TextArea label */
  label: string
  /** Unique id of the component */
  id: string
  /** TextArea helper text */
  helperText?: string
  /** TextArea char limit */
  charLimit?: number
  /** onChange TextArea value event */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** TextArea value */
  value: string | number
  /** TextArea with error */
  error?: boolean
  /**
   * TextArea error message
   */
  errorMessage?: string
}
