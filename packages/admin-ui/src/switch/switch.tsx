import React from 'react'
import type { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { useCheckboxState } from 'reakit/Checkbox'
import { createComponent } from '@vtex/admin-ui-react'

import { Inline } from '../inline'
import { SwitchButton } from './switch-button'
import { Stack } from '../stack'
import { Label } from '../components/Label'
import { SwitchMessage } from './message'
import type { SwitchOptions } from './types'
import { Text } from '../components/Text'

export const Switch = createComponent<typeof ReakitCheckbox, SwitchOptions>(
  (props) => {
    const { state, helpText, errorText, label, error, disabled, ...htmlProps } =
      props

    const hasError = !!(error && errorText)
    const hasMessage = !!(hasError || helpText)

    return (
      <Inline hSpace="$m" vSpace="">
        <SwitchButton state={state} disabled={disabled} {...htmlProps} />
        <Stack space="$s">
          {label && (
            <Text as={Label} tone={disabled ? 'secondary' : 'primary'}>
              {label}
            </Text>
          )}
          {hasMessage && (
            <SwitchMessage helpText={helpText} errorText={errorText} />
          )}
        </Stack>
      </Inline>
    )
  }
)

export { useCheckboxState as useSwitchState }
