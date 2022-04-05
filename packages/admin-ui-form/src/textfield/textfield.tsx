import React from 'react'
import type { Ref } from 'react'
import { createComponent, useElement, useForkRef } from '@vtex/admin-ui'
import invariant from 'tiny-invariant'

import type { FieldProps } from '../field'
import { Field } from '../field'
import type { FormFieldProps } from '../types'

export const Input = createComponent<'input'>((props) => {
  return useElement('input', {
    baseStyle: {
      padding: '$s',
      borderRadius: '$default',
      border: '$form.neutral',
      ':hover': {
        border: '$form.neutralHover',
      },
    },
    autoComplete: 'off',
    ...props,
  })
})

export const Textfield = createComponent<'input', TextfieldProps>((props) => {
  const {
    state,
    name,
    ref,
    required = false,
    tone,
    helperMessage,
    criticalMessage,
    label,
    ...inputProps
  } = props

  const { register } = state

  const { ref: regRef, ...regProps } = register(name, {
    required,
  })

  invariant(
    name,
    'Textfield error: The **name** prop is important for the registration proccess'
  )

  return (
    <Field
      name={name}
      label={label}
      tone={tone}
      helperMessage={helperMessage}
      criticalMessage={criticalMessage}
    >
      <Input
        {...inputProps}
        {...regProps}
        ref={useForkRef(ref as Ref<HTMLInputElement>, regRef)}
      />
    </Field>
  )
})

interface TextfieldProps extends FormFieldProps, FieldProps {
  name: string
}

Textfield.displayName = 'Textfield'
