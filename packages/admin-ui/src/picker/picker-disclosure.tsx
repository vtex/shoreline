import { PopoverDisclosure } from 'reakit/Popover'
import { callAllHandlers } from '@vtex/admin-ui-util'

import type { PickerStateReturn } from './picker-state'

import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const PickerDisclosure = forwardRef(function PickerDisclosure(
  props: PickerDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const { state, onMouseDown: htmlOnMouseDown, ...htmlProps } = props

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <PopoverDisclosure
      ref={ref}
      state={state}
      tabIndex={-1}
      disabled={state.isDisabled || state.isReadOnly}
      onMouseDown={callAllHandlers(htmlOnMouseDown, onMouseDown)}
      {...htmlProps}
    />
  )
})

export interface PickerDisclosureProps
  extends ComponentPropsWithoutRef<'button'> {
  state: PickerStateReturn
}
