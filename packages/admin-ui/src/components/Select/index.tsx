import { useSelect, UseSelectReturnValue } from 'downshift'
import type { Ref } from 'react'
import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { forwardRef } from '@vtex/admin-ui-util'

import { Box } from '../Box'
import type { SystemComponent } from '../../types'
import { Text } from '../Text'
import { DesktopSelect } from './DesktopSelect'
import { MobileSelect } from './MobileSelect'

export const Select = forwardRef(
  <T,>(props: SelectProps<T>, ref: Ref<HTMLDivElement>) => {
    const {
      csx,
      label,
      state,
      items,
      renderItem,
      helperText,
      disabled,
      tone = 'neutral',
      criticalText,
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
      tone,
      block,
    }

    const message = tone === 'critical' ? criticalText : helperText

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
            <Text variant="small" tone={tone} csx={{ lineHeight: 1.5 }}>
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
   * Select's tone of voice
   * @default neutral
   */
  tone?: 'neutral' | 'critical'
  /**
   * Select critical message
   */
  criticalText?: string
  /**
   * Flag to indicate if select is disabled
   */
  disabled?: boolean
  /**
   * Whether is a block-level element or not
   * */
  block?: boolean
}
