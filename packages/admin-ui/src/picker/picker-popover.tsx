import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Popover } from 'reakit/Popover'

import type { PickerStateReturn } from './picker-state'

export const PickerPopover = createComponent<typeof Popover, Options>(
  (props) => {
    const { state, ...popoverProps } = props

    return useElement(Popover, {
      id: state.popoverId,
      state,
      ...popoverProps,
    })
  }
)

interface Options {
  state: PickerStateReturn
}
