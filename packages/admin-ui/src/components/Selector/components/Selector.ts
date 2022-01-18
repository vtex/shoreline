import type { KeyboardEvent, MouseEvent } from 'react'
import { useCallback } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { Role } from 'reakit'
import { createOnKeyDown } from 'reakit-utils'
import { callAllHandlers, ariaAttr, isTouch } from '@vtex/admin-ui-util'

import type { SelectorStateReturn } from './SelectorState'

export const Selector = jsx(Role)(
  {},
  {
    memoize: true,
    options: ['state'],
    useOptions(options: SelectorOptions, props) {
      const {
        state: {
          visible,
          isDisabled,
          isReadOnly,
          show,
          selectorId,
          dialogId,
          segmentFocus,
        },
      } = options

      const {
        onKeyDown: htmlOnKeyDown,
        onClick: htmlOnClick,
        onMouseDown: htmlOnMouseDown,
        ...htmlProps
      } = props

      const onClick = useCallback(() => {
        if (isTouch()) show()
      }, [show])

      // Open the popover on alt + arrow down
      const onKeyDown = createOnKeyDown({
        onKey: htmlOnKeyDown as (event: KeyboardEvent) => any,
        preventDefault: true,
        keyMap: (event) => {
          const isAlt = event.altKey

          return {
            ArrowDown: () => {
              isAlt && show()
            },
          }
        },
      })

      const onMouseDown = useCallback(
        (e: MouseEvent) => {
          e.stopPropagation()
          segmentFocus?.()
        },
        [segmentFocus]
      )

      return {
        id: selectorId,
        role: 'button',
        'aria-haspopup': 'dialog',
        'aria-expanded': visible,
        'aria-owns': visible ? dialogId : undefined,
        'aria-disabled': ariaAttr(isDisabled),
        'aria-readonly': ariaAttr(isReadOnly),
        onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
        onClick: callAllHandlers(htmlOnClick, onClick),
        onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
        ...htmlProps,
      }
    },
  }
)

export interface SelectorOptions {
  state: SelectorStateReturn
}
