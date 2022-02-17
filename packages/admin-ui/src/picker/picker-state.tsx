import type { PopoverInitialState } from 'reakit'
import { unstable_useId as useId, usePopoverState } from 'reakit'

import type { InputState } from '../types'

export function usePickerState(props: PickerInitialState = {}) {
  const {
    pickerId: pickerIdProp,
    popoverId: popoverIdProp,
    isDisabled,
    isReadOnly,
    segmentFocus,
  } = props

  const { id: pickerId } = useId({ id: pickerIdProp, baseId: 'picker' })
  const { id: popoverId } = useId({ id: popoverIdProp, baseId: 'popover' })

  const popover = usePopoverState({ modal: true, ...props })

  return {
    pickerId,
    popoverId,
    isDisabled,
    isReadOnly,
    segmentFocus,
    ...popover,
  }
}

interface PickerState {
  pickerId?: string
  popoverId?: string
  /**
   * Function to be called on picker mousedown
   * for focusing first tabbable element
   */
  segmentFocus?: () => void
}

export type PickerInitialState = PopoverInitialState & InputState & PickerState

export type PickerStateReturn = ReturnType<typeof usePickerState>
