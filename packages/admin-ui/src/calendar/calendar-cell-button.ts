import { useRef, useEffect, useCallback } from 'react'
import { Clickable } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { callAllHandlers, ensureFocus } from '@vtex/admin-ui-util'
import { useForkRef } from '@vtex/admin-ui-hooks'
import { isSameDay } from 'date-fns'

import { useDateFormatter } from '../i18n'
import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

export const CalendarCellButton = createComponent<
  typeof Clickable,
  CalendarCellButtonOptions
>((props) => {
  const {
    date,
    state: {
      isDisabled: isDisabledOption,
      month,
      isInvalidDateRange,
      dateValue,
      focusedDate,
      isFocused: isFocusedOption,
      selectDate,
      setFocusedDate,
    },
    disabled: htmlDisabled,
    onClick: htmlOnClick,
    onFocus: htmlOnFocus,
    ref: htmlRef,
    ...htmlProps
  } = props

  const ref = useRef<HTMLElement>(null)
  const isCurrentMonth = date.getMonth() === month
  const isDisabled =
    isDisabledOption || !isCurrentMonth || isInvalidDateRange(date)

  const disabled = htmlDisabled || isDisabled

  const isSelected = dateValue ? isSameDay(date, dateValue) : false
  const isFocused =
    isFocusedOption && focusedDate && isSameDay(date, focusedDate)

  const isToday = isSameDay(date, new Date())

  // Focus the button in the DOM when the state updates.
  useEffect(() => {
    if (isFocused && ref.current) {
      ensureFocus(ref.current)
    }
  }, [date, focusedDate, isFocused, ref])

  const onClick = useCallback(() => {
    if (disabled) return

    selectDate(date)
    setFocusedDate(date)
  }, [date, disabled, selectDate, setFocusedDate])

  const onFocus = useCallback(() => {
    if (disabled) return

    setFocusedDate(date)
  }, [date, disabled, setFocusedDate])

  const dateFormatter = useDateFormatter({
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // aria-label should be localize Day of week, Month, Day and Year without Time.
  function getAriaLabel() {
    const dateLabel = dateFormatter.format(date)
    const isTodayLabel = isToday ? 'Today, ' : ''
    const isSelectedLabel = isSelected ? ' selected' : ''

    return `${isTodayLabel}${dateLabel}${isSelectedLabel}`
  }

  return useElement(Clickable, {
    baseStyle: style.calendarCellButton,
    ref: useForkRef(ref, htmlRef),
    children: useDateFormatter({ day: 'numeric' }).format(date),
    'aria-label': getAriaLabel(),
    disabled,
    tabIndex: !disabled
      ? isSameDay(date, focusedDate ?? new Date())
        ? 0
        : -1
      : undefined,
    onClick: callAllHandlers(htmlOnClick, onClick),
    onFocus: callAllHandlers(htmlOnFocus, onFocus),
    ...htmlProps,
  })
})

export type CalendarCellButtonOptions = {
  date: Date
  state: CalendarStateReturn
}
