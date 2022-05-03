import type { ReactNode } from 'react'
import React from 'react'
import { createComponent } from '@vtex/admin-ui-react'
import { Group as AriaCheckboxGroup } from 'ariakit/group'

import { FormGroup } from '../form-group'

export const CheckboxGroup = createComponent<'div', CheckboxGroupOptions>(
  (props) => {
    const { children, ...remainingProps } = props

    return (
      <FormGroup componentGroup={AriaCheckboxGroup} {...remainingProps}>
        {children}
      </FormGroup>
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
   * CheckboxGroup label
   */
  label: ReactNode
}

export type CheckboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CheckboxGroup
>
