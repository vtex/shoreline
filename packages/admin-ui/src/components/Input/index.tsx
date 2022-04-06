import type { Ref, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import type { AbstractInputProps } from '../AbstractInput'
import { AbstractInput } from '../AbstractInput'
import { FieldContainer, FloatingLabel, FieldDetails } from '../Field'
import type { SystemComponentProps } from '../../types'

export const Input = forwardRef(function Input(
  props: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    csx = {},
    value = '',
    tone = 'neutral',
    id,
    label,
    helperText,
    charLimit,
    criticalText,
    ...inputProps
  } = props

  const message = tone === 'critical' ? criticalText : helperText

  return (
    <FieldContainer>
      <AbstractInput
        value={value}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        csx={{ paddingTop: 4, ...csx }}
        tone={tone}
        labelElement={<FloatingLabel htmlFor={id}>{label}</FloatingLabel>}
        {...inputProps}
      />
      {(message || !!charLimit) && (
        <FieldDetails
          value={value}
          message={message}
          charLimit={charLimit}
          tone={tone}
        />
      )}
    </FieldContainer>
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
  helperText?: ReactNode
  /** Input char limit */
  charLimit?: number
  /** Input error message */
  criticalText?: string
  /** Input type */
  type?: InputType
}
