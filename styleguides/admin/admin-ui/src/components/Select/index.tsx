import { useSelect, UseSelectReturnValue } from 'downshift'
import React, { Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'
import { BrowserView, MobileView } from 'react-device-detect'

import { SystemComponent } from '../../types'
import { Box } from '@vtex/admin-primitives'
import { Text } from '../Text'
import { DesktopSelect } from './DesktopSelect'
import { MobileSelect } from './MobileSelect'

export const Select = forwardRef(
  <T extends unknown>(props: SelectProps<T>, ref: Ref<HTMLDivElement>) => {
    const {
      csx,
      label,
      state,
      items,
      renderItem,
      helperText,
      disabled,
      error,
      errorMessage,
      block,
      ...restProps
    } = props

    const selectProps = {
      csx,
      label,
      state,
      items,
      renderItem,
      disabled,
      error,
      block,
    }

    const message = error ? errorMessage : helperText

    const styles = block ? { ...csx, width: 'full' } : csx

    return (
      <Box {...restProps} csx={styles} ref={ref}>
        <MobileView>
          <MobileSelect {...selectProps} />
        </MobileView>

        <BrowserView>
          <DesktopSelect {...selectProps} />
        </BrowserView>

        {message && (
          <Box csx={{ paddingTop: 1 }}>
            <Text
              variant="small"
              feedback={error ? 'danger' : 'secondary'}
              csx={{ lineHeight: 1.5 }}
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

export interface SelectProps<T> extends SystemComponent {
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
  /**
   * Whether is a block-level element or not
   * */
  block?: boolean
}
