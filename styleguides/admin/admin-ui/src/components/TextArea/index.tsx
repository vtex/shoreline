import React, { forwardRef, Ref } from 'react'

import { Text } from '../Text'
import { Label } from '../Label'
import { SystemComponentProps } from '../../types'
import { Box } from '@vtex/admin-primitives'
import { useSystem } from '@vtex/admin-core'

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
  const { cn, stylesOf } = useSystem()

  const message = error ? errorMessage : helperText

  const className = cn({
    ...styleOverrides,
    themeKey: 'components.textArea.default',
  })

  return (
    <Box
      csx={{
        themeKey: `components.textArea.container${error ? '-error' : ''}`,
      }}
    >
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
        <Box csx={{ themeKey: 'components.textArea.text-container' }}>
          {message ? (
            <Text variant="small" feedback={error ? 'danger' : 'secondary'}>
              {message}
            </Text>
          ) : (
            <div>{/** spacer element */}</div>
          )}
          {charLimit && (
            <Text variant="small" styleOverrides={{ color: 'mid.primary' }}>
              {`${value.toString().length}/${charLimit}`}
            </Text>
          )}
        </Box>
      )}
    </Box>
  )
})

export type TextAreaOwnProps = Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'value' | 'onChange' | 'maxLength' | 'onClear'
>

export interface TextAreaProps extends SystemComponentProps<TextAreaOwnProps> {
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
