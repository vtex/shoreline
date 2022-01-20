import { jsx } from '@vtex/admin-ui-react'
import type { KeyboardEvent } from 'react'
import { Role } from 'reakit/Role'
import { ariaAttr, callAllHandlers } from '@vtex/admin-ui-util'
import { createOnKeyDown } from 'reakit-utils'

import type { CalendarStateReturn } from './CalendarState'

export const CalendarGrid = jsx(Role)(
  {},
  {
    options: ['state'],
    useOptions(options: CalendarGridOptions, props) {
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
      } = options

      const {
        onKeyDown: htmlOnKeyDown,
        onBlur: htmlOnFocus,
        onBlur: htmlOnBlur,
        ...htmlProps
      } = props

      const onKeyDown = createOnKeyDown({
        onKeyDown: htmlOnKeyDown,
        preventDefault: true,
        keyMap: (event: KeyboardEvent) => {
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

      return {
        role: 'grid',
        'aria-labelledby': calendarId,
        'aria-readonly': ariaAttr(isReadOnly),
        'aria-disabled': ariaAttr(isDisabled),
        onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
        onFocus: callAllHandlers(htmlOnFocus, () => setFocused(true)),
        onBlur: callAllHandlers(htmlOnBlur, () => setFocused(false)),
        ...htmlProps,
      }
    },
  }
)

export type CalendarGridOptions = {
  state: CalendarStateReturn
}
