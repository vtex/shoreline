import React from 'react'
import type { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { createComponent } from '@vtex/admin-ui-react'

import * as style from './switch.style'
import { useCheckboxState } from '../components/Checkbox'
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
        <Stack space="$xs">
          {label && (
            <Text
              as={Label}
              csx={style.label}
              tone={disabled ? 'secondary' : 'primary'}
            >
              {label}
            </Text>
          )}
          {hasMessage && (
            <>
              {helpText && <SwitchMessage helpText={helpText} />}
              {hasError && <SwitchMessage errorText={errorText} />}
            </>
          )}
        </Stack>
      </Inline>
    )
  }
)

export { useCheckboxState as useSwitchState }
