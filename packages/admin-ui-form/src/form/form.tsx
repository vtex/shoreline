import type { AnyObject } from '@vtex/admin-ui'

import type { FormState } from './form.state'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

export const Form = forwardRef(function Form(
  props: FormProps,
  ref: Ref<HTMLFormElement>
) {
  const { state, onSubmit, ...htmlProps } = props

  const { handleSubmit } = state

  return <form ref={ref} onSubmit={handleSubmit(onSubmit)} {...htmlProps} />
})

export interface FormProps extends ComponentPropsWithoutRef<'form'> {
  state: FormState
  onSubmit: (data: AnyObject) => void
}
