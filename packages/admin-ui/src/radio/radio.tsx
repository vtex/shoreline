import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { unstable_useId as useId } from 'reakit/Id'

import { Label } from '../label'
import { Stack } from '../stack'
import { Inline } from '../inline'
import type { RadioButtonProps } from './radio-button'
import { RadioButton } from './radio-button'
import { FormControl, FormControlMessage } from '../form-control'
import { labelTheme } from './radio.css'

export const Radio = forwardRef(function Radio(
  props: RadioProps,
  ref: Ref<HTMLInputElement>
) {
  const { label, helpText, id, ...radioButtonProps } = props

  const { id: baseId } = useId({ id })

  return (
    <FormControl>
      <Inline hSpace="$space-2" vSpace="">
        <RadioButton ref={ref} {...radioButtonProps} id={baseId} />
        <Stack space="$space-05">
          <Label htmlFor={baseId} className={labelTheme}>
            {label}
          </Label>
          <FormControlMessage helpText={helpText} />
        </Stack>
      </Inline>
    </FormControl>
  )
})

export type RadioProps = RadioButtonProps & {
  /**
   * Radio label
   */
  label: ReactNode
  /**
   * Helper text
   */
  helpText?: ReactNode
}
