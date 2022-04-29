import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { RadioState } from 'ariakit/radio'
import { RadioGroup as AriakitRadioGroup } from 'ariakit/radio'

import { Text } from '../components/Text'
import { Stack } from '../stack'
import { Message } from './message'

export const RadioGroup = createComponent<'fieldset', RadioGroupOptions>(
  (props) => {
    const {
      label,
      helpText,
      errorText,
      children,
      direction = 'row',
      state,
      error = false,
      optional = false,
      optionalText,
      ...restProps
    } = props

    return useElement('fieldset', {
      ...restProps,
      children: (
        <Stack space="$l">
          <Text as="legend" variant="detail" tone="secondary">
            {label} {optional ? `(${optionalText})` : ''}
          </Text>
          <AriakitRadioGroup state={state}>
            <Stack direction={direction} space="$xl" csx={{ marginY: '$m' }}>
              {children}
            </Stack>
          </AriakitRadioGroup>
          <Message helpText={helpText} errorText={errorText} error={error} />
        </Stack>
      ),
    })
  }
)

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroup>

export interface RadioGroupOptions {
  /**
   * useRadioState hook return
   */
  state: RadioState
  /**
   * RadioGroup label
   */
  label: ReactNode
  /**
   * Whether is a error field or not
   * @default false
   */
  error?: boolean
  /**
   * RadioGroup children direction
   * @default row
   */
  direction?: 'row' | 'column'
  /**
   * RadioGroup helper text
   */
  helpText?: ReactNode
  /**
   * RadioGroup error text. It appears when error property is set to true.
   */
  errorText?: ReactNode
  /**
   * Whether the field is optional or not
   */
  optional?: boolean
  /**
   * Optional text. It appears when optional property is set to true.
   */
  optionalText?: ReactNode
}

export { useRadioState, RadioState } from 'ariakit/radio'
