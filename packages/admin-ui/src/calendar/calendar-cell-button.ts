import { useRef, useEffect, useCallback } from 'react'
import { Clickable } from 'reakit/Clickable'
import { createComponent, createHook, useElement } from '@vtex/admin-ui-react'
import { callAllHandlers, ensureFocus } from '@vtex/admin-ui-util'
import { useForkRef } from '@vtex/admin-ui-hooks'
import { isSameDay } from 'date-fns'

import { useDateFormatter } from '../i18n'
import * as style from './calendar.style'
import type { CalendarStateReturn } from './calendar-state'

export const useCalendarCellButton = createHook<
  typeof Clickable,
  CalendarCellButtonOptions
>((props) => {
  const {
    date,
    state,
    disabled: htmlDisabled,
    onClick: htmlOnClick,
    onFocus: htmlOnFocus,
    ref: htmlRef,
    ...htmlProps
  } = props

  const {
    isDisabled: isDisabledOption,
    month,
    isInvalidDateRange,
    selectedDate,
    focusedDate,
    isFocused: isFocusedOption,
    selectDate,
    setFocusedDate,
  } = state

  const ref = useRef<HTMLElement>(null)

  const isCurrentMonth = date.getMonth() === month

  const isDisabled =
    isDisabledOption || !isCurrentMonth || isInvalidDateRange(date)

  const disabled = htmlDisabled || isDisabled

  const isSelected = selectedDate.isSameDay(date)

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

  const dayFormatter = useDateFormatter({ day: 'numeric' })

  // aria-label should be localize Day of week, Month, Day and Year without Time.
  const getAriaLabel = () => {
    const dateLabel = dateFormatter.format(date)
    const isTodayLabel = isToday ? 'Today, ' : ''
    const isSelectedLabel = isSelected ? ' selected' : ''

    return `${isTodayLabel}${dateLabel}${isSelectedLabel}`
  }

  const tabIndex = !disabled
    ? isSameDay(date, focusedDate ?? new Date())
      ? 0
      : -1
    : undefined

  return {
    baseStyle: style.calendarCellButton,
    ref: useForkRef(ref, htmlRef),
    children: dayFormatter.format(date),
    'aria-label': getAriaLabel(),
    disabled,
    tabIndex,
    onClick: callAllHandlers(htmlOnClick, onClick),
    onFocus: callAllHandlers(htmlOnFocus, onFocus),
    ...htmlProps,
  }
})

export const CalendarCellButton = createComponent<
  typeof Clickable,
  CalendarCellButtonOptions
>((props) => {
  const calendarCellButtonProps = useCalendarCellButton(props)

  return useElement(Clickable, calendarCellButtonProps)
})

export type CalendarCellButtonOptions = {
  date: Date
  state: CalendarStateReturn
}
