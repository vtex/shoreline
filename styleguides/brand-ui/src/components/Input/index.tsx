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
import { useComponentSx, mergeSx } from '@vtex-components/theme'

import useInputState from './useInputState'

const getLabelStyles = ({
  state,
  size = 'regular',
  prefix = null,
}: {
  state: InputState
  size?: Size
  prefix?: ReactNode
}) => {
  const transitionY = {
    small: -18,
    regular: -24,
    large: -28,
  }

  return mergeSx<SxStyleProp>(
    {
      color: state === 'error' ? 'danger.base' : 'muted.0',
      width: 'fit-content',
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: 2,
      left: prefix ? 48 : 'auto',
      lineHeight: 'action',
      transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
    state !== 'idle'
      ? {
          paddingX: 2,
          paddingY: 0,
          lineHeight: 'small',
          backgroundColor: 'white',
          transform: `translate(${prefix ? -44 : -12}px, ${
            transitionY[size]
          }px) scale(0.75)`,
        }
      : {}
  )
}

const BrandInput = (props: PropsWithChildren<InputProps>) => {
  const {
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
  const { state, charCount, setFocused } = useInputState({
    disabled,
    readOnly,
    error,
    value,
  })
  const styles = useComponentSx('input', {
    size,
    state,
  })

  return (
    <Box
      sx={{ margin: 4, width: 'fit-content' }}
      onFocus={() => redirectFocus()}
    >
      <ReakitInput
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        readOnly={readOnly}
        defaultValue={value}
        type={type}
        id={id}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
        {...inputProps}
      >
        {(enhancedProps) => (
          <Flex sx={mergeSx<SxStyleProp>(styles, sx)}>
            {prefix && (
              <Flex sx={{ alignItems: 'center', mr: 3 }}>{prefix}</Flex>
            )}
            <ThemeUIInput
              sx={{
                border: 'none',
                width: 'fit-content',
                p: 0,
                lineHeight: 'action',
                ':focus': {
                  outline: 'none',
                },
              }}
              {...enhancedProps}
            />
            <Label htmlFor={id} sx={getLabelStyles({ state, size, prefix })}>
              {label}
            </Label>
            {suffix && (
              <Flex sx={{ alignItems: 'center', ml: 3 }}>{suffix}</Flex>
            )}
          </Flex>
        )}
      </ReakitInput>
      <Flex
        sx={{
          mt: 2,
          fontSize: 0,
          color:
            state === 'error'
              ? 'danger.base'
              : 'disabled'
              ? 'muted.1'
              : 'muted.0',
          justifyContent: 'space-between',
        }}
      >
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

export type Size = 'small' | 'regular' | 'large'
export type InputState =
  | 'error'
  | 'idle'
  | 'filled'
  | 'focused'
  | 'disabled'
  | 'readOnly'

export interface InputProps
  extends Pick<BaseProps, 'sx' | 'disabled' | 'readOnly' | 'value' | 'type'> {
  id: string
  helpMessage: string
  label: string
  value?: string | number
  error?: boolean
  charLimit?: number
  prefix?: ReactNode
  size?: Size
  suffix?: ReactNode
}

export default forwardRef(BrandInput)
