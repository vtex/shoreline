import React from 'react'
import { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { createComponent } from '@vtex/admin-ui-react'

import * as style from './switch.style'
import { useCheckboxState } from '../components/Checkbox'
import { Inline } from '../inline'
import { SwitchButton } from './switch-button'
import { Stack } from '../stack'
import { Label } from '../components/Label'
import { Message } from './message'
import { SwitchOptions } from './types'

export const Switch = createComponent<typeof ReakitCheckbox, SwitchOptions>(
  (props) => {
    const { state, helpText, errorText, label, error, ...htmlProps } = props

    const hasError = !!(error && errorText)
    const hasMessage = !!(hasError || helpText)

    return (
      <Inline hSpace="$m" vSpace="">
        <SwitchButton state={state} {...htmlProps} />
        <Stack space="$s">
          {label && <Label csx={style.label}>{label}</Label>}
          {hasMessage && (
            <>
              {helpText && <Message helpText={helpText} />}
              {hasError && <Message errorText={errorText} />}
            </>
          )}
        </Stack>
      </Inline>
    )
  }
)

export { useCheckboxState as useSwitchState }
