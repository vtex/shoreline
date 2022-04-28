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
      optional = false,
      optionalText,
      children,
    } = props

    return (
      <Stack space="$l">
        <Text variant="detail" tone="secondary">
          {label} {optional ? `(${optionalText})` : ''}
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
   * Whether is a optional field or not
   */
  optional?: boolean
  /**
   * Optional text. It appears when optional property is set to true.
   */
  optionalText?: ReactNode
  /**
   * CheckboxGroup label
   */
  label: ReactNode
}

export type CheckboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CheckboxGroup
>
