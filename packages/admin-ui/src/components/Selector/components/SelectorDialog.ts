import { jsx } from '@vtex/admin-ui-react'
import { Popover } from 'reakit'

import type { SelectorStateReturn } from './SelectorState'

export const SelectorDialog = jsx(Popover)(
  {},
  {
    memoize: true,
    options: ['state'],
    useOptions(options: SelectorDialogOptions, props) {
      const { state } = options

      return {
        id: state.dialogId,
        state,
        ...props,
      }
    },
  }
)

export interface SelectorDialogOptions {
  state: SelectorStateReturn
}
