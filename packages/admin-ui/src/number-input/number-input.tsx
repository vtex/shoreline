import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { useRef, forwardRef } from 'react'
import { useForkRef, useId } from '@vtex/admin-ui-hooks'

import { Button, IconCaretDown, IconCaretUp } from '@vtex/admin-ui'
import { TextInputContainer as InputContainer } from '../text-input/text-input-container'
import { TextInputElement as InputElement } from '../text-input/text-input-element'
import { TextInputTerm as InputTerm } from '../text-input/text-input-term'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'

import type { NumberInputValue } from './number-input.state'
import { useNumberInput } from './number-input.state'
import { useMessageFormatter } from '../i18n'

import { messages } from '../form-control/form-control.i18n'

import * as style from './number-input.style'

export const NumberInput = forwardRef(
  (props: NumberInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      prefix,
      suffix,
      disabled,
      optional,
      error,
      errorText,
      helpText,
      label,
      id: defaultId,
      value = '',
      step = 1,
      min = Number.NEGATIVE_INFINITY,
      max = Number.POSITIVE_INFINITY,
      onChange = () => {},
      placeholder,
      ...inputProps
    } = props

    const { getInputProps, getDecrementButtonProps, getIncrementButtonProps } =
      useNumberInput({
        initialValue: value,
        step,
        min,
        max,
        onChange,
      })

    const id = useId(defaultId)

    const formatMessage = useMessageFormatter(messages.formControl)
    const optionalPlaceholder =
      !label && optional ? formatMessage('optional') : ''

    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    // Avoid losing input focus when the spin button is disabled
    const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
      event
    ) => {
      event.preventDefault()
    }

    return (
      <FormControl error={error} optional={optional}>
        {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
        <InputContainer
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          error={error}
          disabled={disabled}
          csx={style.container}
        >
          {prefix && <InputTerm type="prefix">{prefix}</InputTerm>}
          <InputElement
            {...getInputProps({
              id,
              placeholder: optionalPlaceholder ?? placeholder,
              disabled,
              ...inputProps,
            })}
            ref={useForkRef(inputRef, ref)}
            csx={style.input}
          />
          <Button
            {...getDecrementButtonProps({
              icon: <IconCaretDown />,
              csx: style.spinButton,
            })}
          />
          <Button
            {...getIncrementButtonProps({
              icon: <IconCaretUp />,
              csx: style.incrementButton,
            })}
          />
          {suffix && <InputTerm type="suffix">{suffix}</InputTerm>}
        </InputContainer>
        <FormControlMessage helpText={helpText} errorText={errorText} />
      </FormControl>
    )
  }
)

NumberInput.displayName = 'NumberInput'

type JSXInputProps = ComponentPropsWithoutRef<'input'>

interface NumberInputOptions {
  prefix?: ReactNode
  suffix?: ReactNode
  label?: ReactNode
  value?: NumberInputValue
  step?: number
  min?: number
  max?: number
  optional?: boolean
  error?: boolean
  errorText?: ReactNode
  helpText?: ReactNode
  onChange?: (value: NumberInputValue) => void
}

export type NumberInputProps = NumberInputOptions &
  Omit<JSXInputProps, keyof NumberInputOptions>

export type { NumberInputValue } from './number-input.state'
