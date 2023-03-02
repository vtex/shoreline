import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId, useFieldFocus, useForkRef } from '@vtex/admin-ui-hooks'
import { csx } from '@vtex/admin-ui-core'
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
      csx: customCsx = {},
      ...selectProps
    } = props

    const id = useId(defaultId)
    const [focusRef, ensureFocus] = useFieldFocus<HTMLSelectElement>()

    return (
      <FormControl className={csx(customCsx)}>
        {label ? (
          <FormControlLabel optional={optional} htmlFor={id}>
            {label}
          </FormControlLabel>
        ) : null}
        <Box onClick={ensureFocus} csx={styles.container}>
          <SelectInput
            id={id}
            ref={useForkRef(focusRef, ref)}
            error={error}
            {...selectProps}
          >
            {children}
          </SelectInput>
          <Box csx={styles.caret}>
            <SelectIcon />
          </Box>
        </Box>
        <FormControlMessage
          error={error}
          helpText={helpText}
          errorText={errorText}
        />
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
