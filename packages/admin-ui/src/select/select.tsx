import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/admin-ui-hooks'
import type { StyleProp } from '@vtex/admin-ui-core'

import * as styles from './select.styles'
import type { SelectInputOptions } from './select-input'
import { SelectInput } from './select-input'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { Box } from '../box'
import { Stack } from '../stack'
import { IconCaretDown, IconCaretUp } from '@vtex/phosphor-icons'

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
        <Box csx={{ position: 'relative' }}>
          <SelectInput id={id} ref={ref} error={error} {...selectProps}>
            {children}
          </SelectInput>
          <Stack space="0" csx={styles.caret}>
            <IconCaretUp width="12" height="12" />
            <IconCaretDown width="12" height="12" />
          </Stack>
        </Box>
        <FormControlMessage helpText={helpText} errorText={errorText} />
      </FormControl>
    )
  }
)

type JSXSelectProps = ComponentPropsWithoutRef<'select'>

export interface SelectOptions extends SelectInputOptions {
  label?: ReactNode
  helpText?: ReactNode
  errorText?: ReactNode
  optional?: boolean
  csx?: StyleProp
}

export type SelectProps = SelectOptions &
  Omit<JSXSelectProps, keyof SelectOptions>
