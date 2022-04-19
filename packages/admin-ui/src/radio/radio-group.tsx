import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { RadioState } from 'ariakit/radio'
import { RadioGroup as AriakitRadioGroup } from 'ariakit/radio'

import { Text } from '../components/Text'
import { Set } from '../components/Set'
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
      ...restProps
    } = props

    const orientation = direction === 'row' ? 'horizontal' : 'vertical'

    return useElement('fieldset', {
      ...restProps,
      children: (
        <Set spacing="$l" orientation="vertical">
          <Text as="legend" variant="detail" tone="secondary">
            {label}
          </Text>
          <AriakitRadioGroup state={state}>
            <Set
              orientation={orientation}
              spacing="$xl"
              csx={{ marginY: '$m' }}
            >
              {children}
            </Set>
          </AriakitRadioGroup>
          <Message helpText={helpText} errorText={errorText} error={error} />
        </Set>
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
}

export { useRadioState, RadioState } from 'ariakit/radio'
