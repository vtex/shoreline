import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { useRef, forwardRef } from 'react'
import { useId, useForkRef } from '@vtex/admin-ui-hooks'

import { TextInputContainer } from './text-input-container'
import { TextInputElement } from './text-input-element'
import { TextInputTerm } from './text-input-term'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'

export const TextInput = forwardRef(
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
      ...inputProps
    } = props

    const id = useId(defaultId)
    const innerRef = useRef<HTMLInputElement>(null)

    const focus = () => {
      if (innerRef.current) {
        innerRef.current.focus()
      }
    }

    return (
      <FormControl error={error}>
        {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
        <TextInputContainer onClick={focus} error={error} disabled={disabled}>
          {prefix && <TextInputTerm type="prefix">{prefix}</TextInputTerm>}
          <TextInputElement
            ref={useForkRef(innerRef, ref)}
            disabled={disabled}
            id={id}
            aria-invalid={error ? 'true' : 'false'}
            {...inputProps}
          />
          {suffix && <TextInputTerm type="suffix">{suffix}</TextInputTerm>}
        </TextInputContainer>
        <FormControlMessage helpText={helpText} errorText={errorText} />
      </FormControl>
    )
  }
)

TextInput.displayName = 'TextInput'

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
