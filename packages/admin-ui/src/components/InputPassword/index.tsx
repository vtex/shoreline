import type { ReactNodeArray, Ref } from 'react'
import React, { forwardRef } from 'react'

import type { AbstractInputPasswordProps } from '../AbstractInput'
import { AbstractInputPassword } from '../AbstractInput'
import type { SystemComponentProps } from '../../types'
import { FieldContainer, FieldDetails, FloatingLabel } from '../Field'

export const InputPassword = forwardRef(function InputPassword(
  props: InputPasswordProps,
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
      <AbstractInputPassword
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

export type InputPasswordOwnProps = Omit<
  AbstractInputPasswordProps,
  'maxLength' | 'placeholder' | 'id' | 'type'
>

export interface InputPasswordProps
  extends SystemComponentProps<InputPasswordOwnProps> {
  /** label text */
  label: string
  /** unique id of the component */
  id: string
  /** Input helper text */
  helperText?: string | ReactNodeArray
  /** Input char limit */
  charLimit?: number
  /** Input error message */
  criticalText?: string
}
