import React from 'react'
import type { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { useCheckboxState } from 'reakit/Checkbox'
import { createComponent } from '@vtex/admin-ui-react'
import { unstable_useId as useId } from 'reakit/Id'

import { Inline } from '../inline'
import { SwitchButton } from './switch-button'
import { Stack } from '../stack'
import { Label } from '../components/Label'
import type { SwitchOptions } from './types'
import { FormControl, FormControlMessage } from '../form-control'

import * as style from './switch.style'

export const Switch = createComponent<typeof ReakitCheckbox, SwitchOptions>(
  (props) => {
    const {
      id,
      state,
      helpText,
      errorText,
      label,
      error,
      disabled,
      ...htmlProps
    } = props

    const { id: baseId } = useId({ id })

    return (
      <FormControl error={error}>
        <Inline hSpace="$m" vSpace="">
          <SwitchButton
            id={baseId}
            state={state}
            disabled={disabled}
            {...htmlProps}
          />
          <Stack space="$s">
            <Label htmlFor={baseId} csx={style.label}>
              {label}
            </Label>
            <FormControlMessage helpText={helpText} errorText={errorText} />
          </Stack>
        </Inline>
      </FormControl>
    )
  }
)

export { useCheckboxState as useSwitchState }
