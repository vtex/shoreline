import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import { createComponent } from '@vtex/admin-ui-react'

import { messages } from './form-group.i18n'
import { Text } from '../components/Text'
import { Stack } from '../stack'
import { Message } from './message'
import { useMessageFormatter } from '../i18n'

export const FormGroup = createComponent<'div', any>((props) => {
  const {
    label,
    labelAs = 'span',
    direction = 'row',
    children,
    helpText,
    error = false,
    errorText,
    state = null,
    optional = false,
    componentGroup: ComponentGroup = Fragment,
  } = props

  const formatMessage = useMessageFormatter(messages.formGroup)

  return (
    <Stack space="$l">
      <Text as={labelAs} variant="detail" tone="secondary">
        {label} {optional ? `(${formatMessage('optional')})` : ''}
      </Text>
      <ComponentGroup state={state}>
        <Stack direction={direction} space="$xl" csx={{ marginY: '$m' }}>
          {children}
        </Stack>
      </ComponentGroup>
      <Message helpText={helpText} errorText={errorText} error={error} />
    </Stack>
  )
})

export type FormGroupProps = React.ComponentPropsWithoutRef<typeof FormGroup>

export interface FormGroupOptions {
  /**
   * FormGroup children state
   */
  state?: any
  /**
   * Component which will wrap the group children
   */
  componentGroup: ReactNode
  /**
   * FormGroup label
   */
  label: ReactNode
  /**
   * FormGroup label
   */
  labelAs?: any
  /**
   * Whether is a error field or not
   * @default false
   */
  direction?: 'row' | 'column'
  /**
   * FormGroup helper text
   */
  helpText?: ReactNode
  /**
   * FormGroup error text. It appears when error property is set to true.
   */
  error?: boolean
  /**
   * FormGroup children direction
   * @default row
   */
  errorText?: ReactNode
  /**
   * Whether the field is optional or not
   */
  optional?: boolean
}
