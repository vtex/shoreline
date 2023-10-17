import type { Ref, ComponentPropsWithoutRef, MouseEvent } from 'react'
import React, { forwardRef, useCallback } from 'react'
import { useOnKeyDown } from '@vtex/admin-ui-hooks'
import { callAllHandlers, ariaAttr, isTouch } from '@vtex/admin-ui-util'

import type { PickerStateReturn } from './picker-state'

export const Picker = forwardRef(function CalendarHeader(
  props: PickerProps,
  ref: Ref<HTMLDivElement>
) {
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
  } = props as PickerProps

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

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/role-supports-aria-props
    <div
      ref={ref}
      id={pickerId}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={visible}
      aria-owns={visible ? popoverId : undefined}
      aria-disabled={ariaAttr(isDisabled)}
      aria-readonly={ariaAttr(isReadOnly)}
      onKeyDown={callAllHandlers(htmlOnKeyDown, onKeyDown)}
      onClick={callAllHandlers(htmlOnClick, onClick)}
      onMouseDown={callAllHandlers(htmlOnMouseDown, onMouseDown)}
      {...htmlProps}
    />
  )
})

export interface PickerProps extends ComponentPropsWithoutRef<'div'> {
  state: PickerStateReturn
}
