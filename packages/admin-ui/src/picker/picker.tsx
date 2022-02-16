import type { KeyboardEvent, MouseEvent } from 'react'
import { useCallback } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit'

import { callAllHandlers, ariaAttr, isTouch } from '@vtex/admin-ui-util'

import type { PickerStateReturn } from './picker-state'
import { createOnKeyDown } from './create-on-key-down'

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

  // Open the popover on alt + arrow down
  const onKeyDown = createOnKeyDown({
    onKey: htmlOnKeyDown as (event: KeyboardEvent) => any,
    preventDefault: true,
    keyMap: (event) => {
      const isAlt = event.altKey

      return {
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
