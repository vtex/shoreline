import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { ariaAttr, callAllHandlers } from '@vtex/admin-ui-util'
import { useOnKeyDown } from '@vtex/admin-ui-hooks'
import type { CalendarStateReturn } from './calendar-state'

export const CalendarGrid = forwardRef(function CalendarGrid(
  props: CalendarGridProps,
  ref: Ref<HTMLTableElement>
) {
  const {
    state: {
      isReadOnly,
      isDisabled,
      setFocused,
      selectFocusedDate,
      focusPreviousYear,
      focusPreviousMonth,
      focusNextYear,
      focusNextMonth,
      focusEndOfMonth,
      focusStartOfMonth,
      focusNextDay,
      focusPreviousDay,
      focusNextWeek,
      focusPreviousWeek,
      calendarId,
    },
    onKeyDown: htmlOnKeyDown,
    onBlur: htmlOnFocus,
    onBlur: htmlOnBlur,
    ...htmlProps
  } = props

  const onKeyDown = useOnKeyDown<HTMLDivElement>({
    onKeyDown: htmlOnKeyDown,
    keyMap: (event) => {
      const shift = event.shiftKey

      return {
        ' ': selectFocusedDate,
        Enter: selectFocusedDate,
        End: focusEndOfMonth,
        Home: focusStartOfMonth,
        ArrowLeft: focusPreviousDay,
        ArrowUp: focusPreviousWeek,
        ArrowRight: focusNextDay,
        ArrowDown: focusNextWeek,
        PageUp: () => {
          shift ? focusPreviousYear() : focusPreviousMonth()
        },
        PageDown: () => {
          shift ? focusNextYear() : focusNextMonth()
        },
      }
    },
  })

  return (
    <table
      ref={ref}
      role="grid"
      aria-labelledby={calendarId}
      aria-readonly={ariaAttr(isReadOnly)}
      aria-disabled={ariaAttr(isDisabled)}
      onKeyDown={callAllHandlers(htmlOnKeyDown, onKeyDown)}
      onFocus={callAllHandlers(htmlOnFocus, () => setFocused(true))}
      onBlur={callAllHandlers(htmlOnBlur, () => setFocused(false))}
      {...htmlProps}
    />
  )
})

export interface CalendarGridProps extends ComponentPropsWithoutRef<'table'> {
  state: CalendarStateReturn
}