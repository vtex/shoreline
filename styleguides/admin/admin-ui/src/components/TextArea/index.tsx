import React, { forwardRef, Ref } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { Text } from '../Text'
import { Label } from '../Label'
import { Overridable } from '../../types'
import { Box } from '../Box'

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
    state: { value = '', error = false, onChange },
    errorMessage,
    ...textareaProps
  } = props

  const hasHelpers = error || !!helperText || !!charLimit
  const hasHelperMessage = !!helperText || error

  const className = useClassName({
    props: {
      styles: {
        ...styleOverrides,
      },
    },
    themeKey: 'components.textArea.default',
  })

  return (
    <Box themeKey={`components.textArea.${error ? 'error' : 'container'}`}>
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
      <Label htmlFor={id}>{label}</Label>
      {hasHelpers && (
        <Box
          styles={{
            display: 'flex',
            justifyContent: hasHelperMessage ? 'space-between' : 'flex-end',
            paddingTop: 1,
          }}
        >
          {hasHelperMessage && (
            <Text
              variant="small"
              styleOverrides={{
                color: error ? 'danger.base' : 'muted.0',
              }}
            >
              {error ? errorMessage : helperText}
            </Text>
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
  /**
   * TextArea state
   */
  state: TextAreaStateProps
  /**
   * TextArea error message
   */
  errorMessage?: string
}

export interface TextAreaStateProps {
  /** onChange TextArea value event */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** TextArea value */
  value: string | number
  /** TextArea with error */
  error?: boolean
}
