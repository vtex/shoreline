import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { Checkbox } from '@vtex/admin-ui'

import { useCheckboxGroupContext } from './context'

export const FormikCheckbox = forwardRef(
  (props: FormikCheckboxProps, ref: Ref<HTMLInputElement>) => {
    const { state, setTouched } = useCheckboxGroupContext()

    return (
      <Checkbox
        state={state}
        {...(props as any)}
        ref={ref}
        onBlur={() => setTouched(true)}
      />
    )
  }
)

export type FormikCheckboxProps = ComponentPropsWithoutRef<'input'>
