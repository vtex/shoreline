import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Popover } from 'reakit/Popover'
import { cx } from '@vtex/admin-ui-core'

import type { PickerStateReturn } from './picker-state'
import { pickerPopoverTheme } from './picker.css'

export const PickerPopover = forwardRef(function PickerPopover(
  props: PickerPopoverProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', state, ...htmlProps } = props

  return (
    <Popover
      ref={ref}
      className={cx(pickerPopoverTheme, className)}
      id={state.popoverId}
      state={state}
      data-test="hey"
      {...htmlProps}
    />
  )
})

export interface PickerPopoverProps extends ComponentPropsWithoutRef<'div'> {
  state: PickerStateReturn
}
