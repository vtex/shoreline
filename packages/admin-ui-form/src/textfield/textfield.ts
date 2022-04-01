/*

API

fucntion Example() {
  const form = useFormState()

  return (
    <Form state={form}>
      <Textfield name="firstName" state={state} />
      <Select name="gender" state={state} />
      <Submit state={state}>Submit form</Submit>
    </Form>
  )
}


*/
import type { ReactNode, Ref } from 'react'
import { createComponent, useElement, useForkRef } from '@vtex/admin-ui'

import type { FormFieldProps } from '../types'

export const Textfield = createComponent<'input', TextfieldProps>((props) => {
  const { state, name, ref, required = false, ...inputProps } = props

  if (!name) {
    console.warn('Textfields must be named')

    return null
  }

  const { register } = state

  const { ref: regRef, ...regProps } = register(name, {
    required,
  })

  console.log({
    regProps,
  })

  return useElement('input', {
    ref: useForkRef(regRef, ref as Ref<HTMLInputElement>),
    ...regProps,
    ...inputProps,
  })
})

interface TextfieldProps extends FormFieldProps {
  name: string
  /**
   * Field tone
   * @default neutral
   */
  tone?: 'neutral' | 'critical'
  helperMessage?: ReactNode
  criticalMessage?: ReactNode
}

Textfield.displayName = 'Textfield'
