import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { CheckboxProps } from '@vtex/admin-ui'
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

export type FormikCheckboxProps = CheckboxProps
