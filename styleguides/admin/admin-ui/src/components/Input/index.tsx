import React, { forwardRef, Ref } from 'react'

import { AbstractInput, AbstractInputProps } from '../AbstractInput'
import { Text } from '../Text'
import { Label } from '../Label'
import { SystemComponentProps } from '../../types'
import { Box } from '../Box'
import { useSystem } from '@vtex/admin-core'

export const Input = forwardRef(function Input(
  props: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    styleOverrides = {},
    value = '',
    error = false,
    id,
    label,
    helperText,
    charLimit,
    errorMessage,
    ...inputProps
  } = props
  const { stylesOf } = useSystem()

  const message = error ? errorMessage : helperText

  return (
    <Box themeKey="components.input.container">
      <AbstractInput
        value={value}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        styleOverrides={{ paddingTop: 4, ...styleOverrides }}
        error={error}
        labelElement={
          <Label
            styleOverrides={stylesOf('components.input.floating-label')}
            htmlFor={id}
          >
            {label}
          </Label>
        }
        {...inputProps}
      />
      {(message || !!charLimit) && (
        <Box themeKey="components.input.text-container">
          {message ? (
            <Text variant="small" feedback={error ? 'danger' : 'secondary'}>
              {message}
            </Text>
          ) : (
            <div>{/** spacer element */}</div>
          )}
          {!!charLimit && (
            <Text variant="small" feedback="secondary">
              {`${value.toString().length}/${charLimit}`}
            </Text>
          )}
        </Box>
      )}
    </Box>
  )
})

export type InputType = 'text' | 'email' | 'url' | 'tel'

export type InputOwnProps = Omit<
  AbstractInputProps,
  'maxLength' | 'placeholder' | 'id' | 'type'
>

export interface InputProps extends SystemComponentProps<InputOwnProps> {
  /** label text */
  label: string
  /** unique id of the component */
  id: string
  /** Input helper text */
  helperText?: string
  /** Input char limit */
  charLimit?: number
  /** Input error message */
  errorMessage?: string
  /** Input type */
  type?: InputType
}
