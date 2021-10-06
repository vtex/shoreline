import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { tag } from '@vtex/admin-ui-react'

import { FloatingLabel, FieldDetails, FieldContainer } from '../Field'
import type { SystemComponentProps } from '../../types'

export const TextArea = forwardRef(function Textarea(
  props: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const {
    id,
    label,
    csx,
    helperText,
    charLimit,
    value = '',
    error = false,
    onChange,
    errorMessage,
    ...textareaProps
  } = props

  const message = error ? errorMessage : helperText

  return (
    <FieldContainer
      csx={{
        width: 'full',
        textarea: error
          ? {
              borderColor: 'inputError',
              ':focus': {
                borderColor: 'inputError',
                boxShadow: 'inputFocusError',
              },
              ':hover': {
                borderColor: 'inputError',
              },
            }
          : {},
      }}
    >
      <tag.textarea
        csx={{
          fontFamily: 'sans',
          paddingTop: 24,
          height: 100,
          resize: 'none',
          fontSettings: 'regular',
          width: 'full',
          borderStyle: 'solid',
          borderWidth: 1,
          paddingLeft: 3,
          paddingRight: 4,
          borderColor: 'input',
          borderRadius: 'default',
          bg: 'inherit',
          marginY: 1,
          fontSize: 1,
          color: 'base',
          outline: 0,
          transition: 'snap',
          ':hover': {
            borderColor: 'inputHover',
          },
          ':focus': {
            borderColor: 'inputFocus',
            boxShadow: 'inputFocus',
          },
          ':disabled': {
            bg: 'light.secondary', // TODO missing
            color: 'mid.primary', // TODO missing
            borderColor: 'mid.secondary', // TODO missing
          },
          ...csx,
        }}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        value={value}
        onChange={onChange}
        {...textareaProps}
      />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      {(message || !!charLimit) && (
        <FieldDetails
          value={value}
          message={message}
          charLimit={charLimit}
          error={error}
        />
      )}
    </FieldContainer>
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
