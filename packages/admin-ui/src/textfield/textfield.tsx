import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { TextfieldContainer } from './textfield-container'
import { TextfieldInput } from './textfield-input'
import { TextfieldTerm } from './textfield-term'

export const Textfield = forwardRef(
  (props: TextfieldProps, ref: Ref<HTMLInputElement>) => {
    const { prefix, suffix, error, disabled, ...inputProps } = props

    return (
      <TextfieldContainer error={error} disabled={disabled}>
        {prefix && <TextfieldTerm type="prefix">{prefix}</TextfieldTerm>}
        <TextfieldInput ref={ref} disabled={disabled} {...inputProps} />
        {suffix && <TextfieldTerm type="suffix">{suffix}</TextfieldTerm>}
      </TextfieldContainer>
    )
  }
)

Textfield.displayName = 'Textfield'

type JSXInputProps = ComponentPropsWithoutRef<'input'>

interface TextfieldOptions {
  prefix?: ReactNode
  suffix?: ReactNode
  error?: boolean
}

export type TextfieldProps = TextfieldOptions &
  Omit<JSXInputProps, keyof TextfieldOptions>
