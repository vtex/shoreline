import type { PopoverInitialState } from 'reakit'
import { unstable_useId as useId, usePopoverState } from 'reakit'

import type { IsInput } from '../../../types'

export type SelectorInitialState = PopoverInitialState &
  IsInput & {
    /**
     * Selector wrapper Id
     */
    selectorId?: string
    /**
     * Dialog Id
     */
    dialogId?: string
    /**
     * Function to be called on selector mousedown
     * for focusing first tabbable element
     */
    segmentFocus?: () => void
  }

export const useSelectorState = (props: SelectorInitialState = {}) => {
  const {
    selectorId: selectorIdProp,
    dialogId: dialogIdProp,
    isDisabled,
    isReadOnly,
    segmentFocus,
  } = props

  const { id: selectorId } = useId({ id: selectorIdProp, baseId: 'selector' })
  const { id: dialogId } = useId({ id: dialogIdProp, baseId: 'dialog' })

  const popover = usePopoverState({ modal: true, ...props })

  return {
    selectorId,
    dialogId,
    isDisabled,
    isReadOnly,
    segmentFocus,
    ...popover,
  }
}

export type SelectorStateReturn = ReturnType<typeof useSelectorState>
