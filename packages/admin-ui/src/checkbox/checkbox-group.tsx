import type { ReactNode } from 'react'
import React from 'react'
import { createComponent } from '@vtex/admin-ui-react'
import { Group as AriaCheckboxGroup } from 'ariakit/group'

import { Text } from '../components/Text'
import { Stack } from '../stack'
import { Message } from './message'

export const CheckboxGroup = createComponent<'div', CheckboxGroupOptions>(
  (props) => {
    const {
      label,
      helpText,
      errorText,
      error = false,
      direction = 'row',
      children,
    } = props

    return (
      <Stack space="$l">
        <Text variant="detail" tone="secondary">
          {label}
        </Text>
        <AriaCheckboxGroup>
          <Stack direction={direction} space="$xl" csx={{ marginY: '$m' }}>
            {children}
          </Stack>
        </AriaCheckboxGroup>
        <Message helpText={helpText} errorText={errorText} error={error} />
      </Stack>
    )
  }
)

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

export type CheckboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CheckboxGroup
>

export { useCheckboxState, CheckboxState } from 'ariakit/checkbox'
