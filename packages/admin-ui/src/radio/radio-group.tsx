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
      invalidText,
      children,
      direction = 'row',
      state,
      invalid = false,
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
          <Message
            helpText={helpText}
            invalidText={invalidText}
            invalid={invalid}
          />
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
   * Whether is a invalid field or not
   * @default false
   */
  invalid?: boolean
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
   * RadioGroup invalid text. It appears when invalid property is set to true.
   */
  invalidText?: ReactNode
}

export { useRadioState, RadioState } from 'ariakit/radio'
