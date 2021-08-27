import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { Radio } from '@vtex/admin-ui'

import { useRadioGroupContext } from './context'

export const FormikRadio = forwardRef(
  (props: FormikRadioProps, ref: Ref<HTMLInputElement>) => {
    const { state, setTouched } = useRadioGroupContext()

    return (
      <Radio
        state={state}
        {...(props as any)}
        ref={ref}
        onBlur={() => setTouched(true)}
      />
    )
  }
)

// TODO Fix the type once the @vtex/admin-ui-core has it
export type FormikRadioProps = ComponentPropsWithoutRef<'input'>
