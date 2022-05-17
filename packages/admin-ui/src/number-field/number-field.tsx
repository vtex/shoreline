import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/admin-ui-hooks'

import { Button, IconCaretDown, IconCaretUp } from '@vtex/admin-ui'
import { TextInputContainer as InputContainer } from '../text-input/text-input-container'
import { TextInputElement as InputElement } from '../text-input/text-input-element'
import { TextInputTerm as InputTerm } from '../text-input/text-input-term'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'

import { useNumberFieldState } from './number-field.state'

import * as style from './number-field.style'

export const NumberInput = forwardRef(
  (props: TextInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      prefix,
      suffix,
      error,
      disabled,
      errorText,
      helpText,
      label,
      id: defaultId,
      value,
      step = 1,
      onChange,
      ...inputProps
    } = props

    const { currentValue, handleChange, handleDecrement, handleIncrement } =
      useNumberFieldState(
        0,
        Number(inputProps.max),
        Number(inputProps.min),
        Number(step)
      )

    const id = useId(defaultId)

    return (
      <FormControl error={error} optional>
        {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
        <InputContainer error={error} disabled={disabled} csx={style.container}>
          {prefix && <InputTerm type="prefix">{prefix}</InputTerm>}
          <InputElement
            ref={ref}
            type="number"
            id={id}
            disabled={disabled}
            value={currentValue}
            csx={style.input}
            onChange={handleChange}
            {...inputProps}
          />
          <Button
            variant="tertiary"
            icon={<IconCaretDown />}
            onClick={handleDecrement}
            csx={style.spinButton}
          />
          <Button
            variant="tertiary"
            icon={<IconCaretUp />}
            onClick={handleIncrement}
            csx={style.incrementButton}
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

interface TextInputOptions {
  prefix?: ReactNode
  suffix?: ReactNode
  error?: boolean
  errorText?: ReactNode
  helpText?: ReactNode
  label?: ReactNode
}

export type TextInputProps = TextInputOptions &
  Omit<JSXInputProps, keyof TextInputOptions>
