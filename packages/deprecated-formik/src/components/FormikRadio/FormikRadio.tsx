import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { RadioProps } from '@vtex/admin-ui'
import { Radio } from '@vtex/admin-ui'

import { useRadioGroupContext } from './context'

/**
 * @deprecated Use @vtex/admin-ui-form instead
 * @see https://admin-ui.vercel.app/next/guidelines/components/form
 */
export const FormikRadio = forwardRef(
  (props: FormikRadioProps, ref: Ref<HTMLInputElement>) => {
    const { setTouched } = useRadioGroupContext()

    return (
      <Radio
        {...(props as any)}
        ref={ref}
        onBlur={() => {
          setTouched(true)
        }}
      />
    )
  }
)

export type FormikRadioProps = RadioProps
