import { createComponent, useElement } from '@vtex/admin-ui-react'
import { PopoverDisclosure } from 'reakit/Popover'
import { callAllHandlers } from '@vtex/admin-ui-util'

import type { PickerStateReturn } from './picker-state'

export const PickerDisclosure = createComponent<
  typeof PopoverDisclosure,
  Options
>((props) => {
  const { state, onMouseDown: htmlOnMouseDown, ...htmlProps } = props

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return useElement(PopoverDisclosure, {
    state,
    tabIndex: -1,
    disabled: state.isDisabled || state.isReadOnly,
    onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
    ...htmlProps,
  })
})

interface Options {
  state: PickerStateReturn
}
