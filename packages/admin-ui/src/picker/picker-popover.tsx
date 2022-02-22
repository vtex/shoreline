import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Popover } from 'reakit/Popover'

import type { PickerStateReturn } from './picker-state'
import * as style from './picker.style'

export const PickerPopover = createComponent<typeof Popover, Options>(
  (props) => {
    const { state, ...popoverProps } = props

    return useElement(Popover, {
      id: state.popoverId,
      state,
      baseStyle: style.popoverStyle,
      ...popoverProps,
    })
  }
)

interface Options {
  state: PickerStateReturn
}
