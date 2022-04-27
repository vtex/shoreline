import type { ReactNode } from 'react'
import React from 'react'
import { createComponent } from '@vtex/admin-ui-react'

import { Text } from '../components/Text'
import { Set } from '../components/Set'
import { Message } from './message'

export const CheckboxGroup = createComponent<'div', CheckboxGroupOptions>(
  (props) => {
    const {
      label,
      helpText,
      errorText,
      children,
      direction = 'row',
      error = false,
    } = props

    const orientation = direction === 'row' ? 'horizontal' : 'vertical'

    return (
      <Set spacing="$l" orientation="vertical">
        <Text variant="detail" tone="secondary">
          {label}
        </Text>
        <Set orientation={orientation} spacing="$xl" csx={{ marginY: '$m' }}>
          {children}
        </Set>
        <Message helpText={helpText} errorText={errorText} error={error} />
      </Set>
    )
  }
)

export type CheckboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CheckboxGroup
>

export interface CheckboxGroupOptions {
  /**
   * CheckboxGroup children direction
   * @default row
   */
  direction?: 'row' | 'column'
  /**
   * Whether is a error field or not
   * @default false
   */
  error?: boolean
  /**
   * CheckboxGroup error text. It appears when error property is set to true.
   */
  errorText?: ReactNode
  /**
   * CheckboxGroup helper text
   */
  helpText?: ReactNode
  /**
   * CheckboxGroup label
   */
  label: ReactNode
}

export { useRadioState, RadioState } from 'ariakit/radio'
