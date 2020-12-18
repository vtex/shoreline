import { useSelect, UseSelectReturnValue } from 'downshift'
import React, { Ref } from 'react'
import { forwardRef } from '@vtex/admin-ui-system'

import { Overridable } from '../../types'
import { Box } from '../Box'
import { Text } from '../Text'
import { DesktopSelect } from './DesktopSelect'
import { MobileSelect } from './MobileSelect'

export const Select = forwardRef(
  <T extends unknown>(props: SelectProps<T>, ref: Ref<HTMLDivElement>) => {
    const {
      styleOverrides,
      label,
      state,
      items,
      renderItem,
      helperText,
      disabled,
      error,
      errorMessage,
      ...restProps
    } = props

    const selectProps = {
      styleOverrides,
      label,
      state,
      items,
      renderItem,
      disabled,
      error,
    }

    const message = error ? errorMessage : helperText

    return (
      <Box {...restProps} styles={{ ...styleOverrides }} ref={ref}>
        <Box styles={{ display: ['flex', 'none'] }}>
          <MobileSelect {...selectProps} />
        </Box>

        <Box styles={{ display: ['none', 'flex'] }}>
          <DesktopSelect {...selectProps} />
        </Box>

        {message && (
          <Box styles={{ paddingTop: 1 }}>
            <Text
              variant="small"
              feedback={error ? 'danger' : 'secondary'}
              styleOverrides={{ lineHeight: 1.5 }}
            >
              {message}
            </Text>
          </Box>
        )}
      </Box>
    )
  }
)

export { useSelect as useSelectState }
export { UseSelectReturnValue }

export interface SelectProps<T> extends Overridable {
  /**
   * Select label
   */
  label: string
  /**
   * return of useSelectState
   */
  state: UseSelectReturnValue<T>
  /**
   * array of items
   */
  items: T[]
  /**
   * Custom item rendering
   */
  renderItem?: (item: T | null) => string
  /**
   * Select helper text
   */
  helperText?: string
  /**
   * Select with error
   */
  error?: boolean
  /**
   * Select error message
   */
  errorMessage?: string
  /**
   * Flag to indicate if select is disabled
   */
  disabled?: boolean
}
