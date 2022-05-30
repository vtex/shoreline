import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/admin-ui-hooks'
import type { StyleProp } from '@vtex/admin-ui-core'

import type { SelectInputOptions, JSXSelectProps } from './select-input'
import { SelectInput } from './select-input'
import * as styles from './select.styles'
import { SelectIcon } from './select-icon'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { Box } from '../box'

export const Select = forwardRef(
  (props: SelectProps, ref: Ref<HTMLSelectElement>) => {
    const {
      children,
      error,
      label,
      helpText,
      errorText,
      optional = false,
      id: defaultId,
      csx,
      ...selectProps
    } = props

    const id = useId(defaultId)

    return (
      <FormControl error={error} optional={optional} csx={csx}>
        {label ? (
          <FormControlLabel htmlFor={id}>{label}</FormControlLabel>
        ) : null}
        <Box csx={styles.container}>
          <SelectInput id={id} ref={ref} error={error} {...selectProps}>
            {children}
          </SelectInput>
          <Box csx={styles.caret}>
            <SelectIcon />
          </Box>
        </Box>
        <FormControlMessage helpText={helpText} errorText={errorText} />
      </FormControl>
    )
  }
)

export interface SelectOptions extends Omit<SelectInputOptions, 'variant'> {
  label?: ReactNode
  csx?: StyleProp
  helpText?: ReactNode
  errorText?: ReactNode
  optional?: boolean
}

export type SelectProps = SelectOptions &
  Omit<JSXSelectProps, keyof SelectOptions>
