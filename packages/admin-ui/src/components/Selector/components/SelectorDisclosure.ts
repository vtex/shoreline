import { jsx } from '@vtex/admin-ui-react'
import { PopoverDisclosure } from 'reakit'
import { callAllHandlers } from '@vtex/admin-ui-util'

import type { SelectorStateReturn } from './SelectorState'

export const SelectorDisclosure = jsx(PopoverDisclosure)(
  {},
  {
    options: ['state'],
    memoize: true,
    useOptions(options: SelectorDisclosureOptions, props) {
      const { state } = options
      const { onMouseDown: htmlOnMouseDown, ...htmlProps } = props

      const onMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation()
      }

      return {
        state,
        tabIndex: -1,
        disabled: state.isDisabled || state.isReadOnly,
        onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
        ...htmlProps,
      }
    },
  }
)

export interface SelectorDisclosureOptions {
  state: SelectorStateReturn
}
