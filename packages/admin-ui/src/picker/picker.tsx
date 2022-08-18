import type { MouseEvent } from 'react'
import { useCallback } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit'
import { useOnKeyDown } from '@vtex/admin-ui-hooks'
import { callAllHandlers, ariaAttr, isTouch } from '@vtex/admin-ui-util'

import type { PickerStateReturn } from './picker-state'

export const Picker = createComponent<typeof Role, Options>((props) => {
  const {
    state: {
      visible,
      isDisabled,
      isReadOnly,
      show,
      pickerId,
      popoverId,
      segmentFocus,
    },
    onKeyDown: htmlOnKeyDown,
    onClick: htmlOnClick,
    onMouseDown: htmlOnMouseDown,
    ...htmlProps
  } = props

  const onClick = useCallback(() => {
    if (isTouch()) show()
  }, [show])

  const onKeyDown = useOnKeyDown<HTMLDivElement>({
    onKey: htmlOnKeyDown,
    keyMap: (event) => {
      const isAlt = event.altKey

      return {
        // Open the popover on alt + arrow down
        ArrowDown: () => {
          if (isAlt) show()
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

  return useElement(Role, {
    id: pickerId,
    role: 'button',
    'aria-haspopup': 'dialog',
    'aria-expanded': visible,
    'aria-owns': visible ? popoverId : undefined,
    'aria-disabled': ariaAttr(isDisabled),
    'aria-readonly': ariaAttr(isReadOnly),
    onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
    onClick: callAllHandlers(htmlOnClick, onClick),
    onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
    ...htmlProps,
  })
})

interface Options {
  state: PickerStateReturn
}
