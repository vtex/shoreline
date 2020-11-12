import React, { useState, forwardRef, ReactNode, Ref } from 'react'

import { unstableInput as Input, InputProps } from '../unstableInput'
import { Text } from '../Text'
import { Label } from '../Label'
import { Overridable } from '../../types'
import { Columns } from '../Columns'
import { Box } from '../Box'

export const TextField = forwardRef(function Textfield(
  props: TextFieldProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    id,
    label,
    styleOverrides,
    helperText,
    charLimit,
    type,
    icon,
    suffix,
    onClick,
    state: { value = '', onChange, onClear },
    errorMessage,
    ...inputProps
  } = props

  const [passwordShown, setPasswordShown] = useState(false)

  function togglePasswordVisibility() {
    setPasswordShown(!passwordShown)
  }

  return (
    <Box
      themeKey={`components.textField.${errorMessage ? 'error' : 'default'}`}
    >
      {type === 'password' ? (
        <Input
          id={id}
          ref={ref}
          placeholder=" "
          maxLength={charLimit}
          value={value}
          suffix={suffix}
          icon={icon}
          type={passwordShown ? 'text' : 'password'}
          onClear={onClear}
          onClick={onClick ?? togglePasswordVisibility}
          onChange={onChange}
          styleOverrides={{ paddingTop: 4, ...styleOverrides }}
          optionalFeature={(styles) => (
            <Label styleOverrides={styles} htmlFor={id}>
              {label}
            </Label>
          )}
          {...inputProps}
        />
      ) : (
        <Input
          id={id}
          ref={ref}
          placeholder=" "
          maxLength={charLimit}
          value={value}
          suffix={suffix}
          icon={icon}
          onClear={onClear}
          onChange={onChange}
          styleOverrides={{ paddingTop: 4, ...styleOverrides }}
          optionalFeature={(styles) => (
            <Label styleOverrides={styles} htmlFor={id}>
              {label}
            </Label>
          )}
          {...inputProps}
        />
      )}
      {(!!helperText || !!errorMessage || !!charLimit) && (
        <Columns styleOverrides={{ paddingTop: 1 }}>
          {(!!helperText || !!errorMessage) && (
            <Columns.Item
              styleOverrides={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Text
                variant="small"
                styleOverrides={{
                  color: errorMessage ? 'danger.base' : 'muted.0',
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
              <Text variant="small" styleOverrides={{ color: 'muted.0' }}>
                {`${value.toString().length}/${charLimit}`}
              </Text>
            </Columns.Item>
          )}
        </Columns>
      )}
    </Box>
  )
})

export interface TextFieldProps
  extends Omit<InputProps, 'value' | 'onChange' | 'maxLength' | 'onClear'>,
    Overridable {
  /** label text */
  label: string
  /** unique id of the component */
  id: string
  /** Input helper text */
  helperText?: string
  /** Input char limit */
  charLimit?: number
  /** Input Icon */
  icon?: ReactNode
  /** Input Suffix */
  suffix?: string
  /** Input Type */
  type?: string
  /**
   * Input state
   */
  state: StateProps
  /**
   * TextField error message
   */
  errorMessage?: string
  /** onChange input value event */
  onClick?: () => void
}

export interface StateProps {
  /** onClear input value */
  onClear?: () => void
  /** onChange input value event */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Input value */
  value: string | number
}
