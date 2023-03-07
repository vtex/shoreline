import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'

import { unstable_useId as useId } from 'reakit/Id'

import { Stack } from '../stack'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { csx } from '@vtex/admin-ui-core'

export const CheckboxGroup = forwardRef(function CheckboxGroup(
  props: CheckboxGroupProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    children,
    label,
    helpText,
    errorText,
    error,
    optional,
    direction,
    ...htmlProps
  } = props

  const { id } = useId()

  return (
    <div ref={ref} role="group" aria-labelledby={id} {...htmlProps}>
      <FormControl>
        <FormControlLabel id={id} optional={optional}>
          {label}
        </FormControlLabel>
        <Stack
          direction={direction}
          space="$space-4"
          className={csx({ paddingY: '$space-1' })}
        >
          {children}
        </Stack>
        <FormControlMessage
          error={error}
          helpText={helpText}
          errorText={errorText}
        />
      </FormControl>
    </div>
  )
})

export type CheckboxGroupProps = React.ComponentPropsWithoutRef<'div'> & {
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
