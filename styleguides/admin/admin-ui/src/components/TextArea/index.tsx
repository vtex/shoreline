import React, { forwardRef, Ref } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { Text } from '../Text'
import { Label } from '../Label'
import { Overridable } from '../../types'
import { Columns } from '../Columns'
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
    state: { value = '', onChange },
    errorMessage,
    ...textareaProps
  } = props

  const className = useClassName({
    props: {
      styles: {
        ...styleOverrides,
      },
    },
    themeKey: 'components.textArea.default',
  })

  return (
    <Box
      themeKey={`components.textArea.${errorMessage ? 'error' : 'container'}`}
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
      <Label htmlFor={id}>{label}</Label>
      {(!!helperText || !!errorMessage || !!charLimit) && (
        <Columns styleOverrides={{ paddingTop: 1 }}>
          {(!!helperText || !!errorMessage) && (
            <Columns.Item
              styleOverrides={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Text
                variant="small"
                styleOverrides={{
                  color: errorMessage ? 'danger.base' : 'muted.1',
                }}
              >
                {errorMessage ?? helperText}
              </Text>
            </Columns.Item>
          )}
          {!!charLimit && (
            <Columns.Item
              units={3}
              styleOverrides={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
                {`${value.toString().length}/${charLimit}`}
              </Text>
            </Columns.Item>
          )}
        </Columns>
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
  /** label text */
  label: string
  /** unique id of the component */
  id: string
  /** Input helper text */
  helperText?: string
  /** Input char limit */
  charLimit?: number
  /**
   * Input state
   */
  state: TextAreaStateProps
  /**
   * TextArea error message
   */
  errorMessage?: string
}

export interface TextAreaStateProps {
  /** onChange input value event */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** Input value */
  value: string | number
}
