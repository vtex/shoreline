import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { TextInputContainer } from './text-input-container'
import { TextInputElement } from './text-input-element'
import { TextInputTerm } from './text-input-term'

export const TextInput = forwardRef(
  (props: TextInputProps, ref: Ref<HTMLInputElement>) => {
    const { prefix, suffix, error, disabled, ...inputProps } = props

    return (
      <TextInputContainer error={error} disabled={disabled}>
        {prefix && <TextInputTerm type="prefix">{prefix}</TextInputTerm>}
        <TextInputElement ref={ref} disabled={disabled} {...inputProps} />
        {suffix && <TextInputTerm type="suffix">{suffix}</TextInputTerm>}
      </TextInputContainer>
    )
  }
)

TextInput.displayName = 'TextInput'

type JSXInputProps = ComponentPropsWithoutRef<'input'>

interface TextInputOptions {
  prefix?: ReactNode
  suffix?: ReactNode
  error?: boolean
}

export type TextInputProps = TextInputOptions &
  Omit<JSXInputProps, keyof TextInputOptions>
