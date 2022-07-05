import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { CheckboxProps } from '@vtex/admin-ui'
import { Checkbox } from '@vtex/admin-ui'

import { useCheckboxGroupContext } from './context'

/**
 * @deprecated Use @vtex/admin-ui-form instead
 * @see https://admin-ui.vercel.app/next/guidelines/components/form
 */
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
