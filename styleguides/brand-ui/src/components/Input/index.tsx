import React, { useState, useRef, PropsWithChildren, ReactNode } from 'react'
import {
  Box,
  Flex,
  Label,
  Input as ThemeUIInput,
  Text,
  SxStyleProp,
} from 'theme-ui'
import { Input as ReakitInput, InputProps as BaseProps } from 'reakit/Input'
import { forwardRef } from '@vtex-components/utils'

import useInputState from './useInputState'

export const Input = (props: PropsWithChildren<InputProps>) => {
  const {
    darkMode = false,
    size = 'regular',
    label,
    id,
    charLimit,
    helpMessage,
    prefix,
    suffix,
    readOnly,
    disabled,
    error,
    value: initialValue,
    type = 'text',
    sx = {},
    ...inputProps
  } = props

  const ref = useRef<HTMLInputElement>(null)
  const redirectFocus = () => ref.current?.focus()

  const [value, setValue] = useState(initialValue)
  const { state, charCount, setFocused, transform } = useInputState({
    disabled,
    readOnly,
    error,
    value,
    charLimit,
  })

  const labelVariant = `input.label.${size}-${prefix ? 'prefix-' : ''}${
    transform ? 'translate' : 'default'
  }`
  const helpMessageVariant = `input.helpMessage${
    darkMode ? '.dark' : ''
  }.${state}`

  return (
    <Box variant="input.container" sx={sx} onFocus={() => redirectFocus()}>
      <ReakitInput
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        id={id}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
        {...inputProps}
      >
        {(enhancedProps) => (
          <Flex variant={`input.${size}-${state}${darkMode ? '-dark' : ''}`}>
            {prefix && <Flex variant="input.prefix">{prefix}</Flex>}
            <ThemeUIInput {...enhancedProps} />
            <Label htmlFor={id} variant={labelVariant}>
              {label}
            </Label>
            {suffix && <Flex variant="input.suffix">{suffix}</Flex>}
          </Flex>
        )}
      </ReakitInput>
      <Flex variant={helpMessageVariant}>
        <Text>{helpMessage}</Text>
        {charLimit && (
          <Text>
            {charCount}/{charLimit}
          </Text>
        )}
      </Flex>
    </Box>
  )
}

export type Size = 'regular' | 'large'
export type InputState = 'error' | 'default' | 'disabled' | 'readOnly'

export interface InputProps
  extends Pick<BaseProps, 'disabled' | 'readOnly' | 'value' | 'type'> {
  id: string
  label: string
  helpMessage?: string
  value?: string | number
  error?: boolean
  charLimit?: number
  prefix?: ReactNode
  size?: Size
  suffix?: ReactNode
  sx?: SxStyleProp
  darkMode?: boolean
}

export default forwardRef(Input)
