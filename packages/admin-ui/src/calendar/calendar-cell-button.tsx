import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { useRef, useEffect, useCallback, forwardRef } from 'react'
import { Clickable } from 'reakit/Clickable'
import { callAllHandlers, ensureFocus } from '@vtex/admin-ui-util'
import { useForkRef } from '@vtex/admin-ui-hooks'
import { isSameDay } from 'date-fns'

import { useDateFormatter } from '../i18n'
import type { CalendarStateReturn } from './calendar-state'
import { cx } from '@vtex/admin-ui-core'
import { calendarCellButtonTheme } from './calendar.style'

export const CalendarCellButton = forwardRef(function CalendarCellButton(
  props: CalendarCellButtonProps,
  ref: Ref<HTMLButtonElement>
) {
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
    className = '',
    ...htmlProps
  } = props

  const htmlRef = useRef<HTMLElement>(null)
  const isCurrentMonth = date.getMonth() === month
  const isDisabled =
    isDisabledOption || !isCurrentMonth || isInvalidDateRange(date)

  const disabled = htmlDisabled || isDisabled

  const isSelected = dateValue ? isSameDay(date, dateValue) : false
  const isFocused =
    isFocusedOption && focusedDate && isSameDay(date, focusedDate)

  const isToday = isSameDay(date, new Date())

  useEffect(() => {
    if (isFocused && htmlRef.current) {
      ensureFocus(htmlRef.current)
    }
  }, [date, focusedDate, isFocused, htmlRef])

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

  const tabIndex = !disabled
    ? isSameDay(date, focusedDate ?? new Date())
      ? 0
      : -1
    : undefined

  return (
    <Clickable
      ref={useForkRef(ref, htmlRef)}
      aria-label={getAriaLabel()}
      className={cx(calendarCellButtonTheme, className)}
      onClick={callAllHandlers(htmlOnClick, onClick)}
      onFocus={callAllHandlers(htmlOnFocus, onFocus)}
      disabled={disabled}
      tabIndex={tabIndex}
      {...htmlProps}
    >
      {useDateFormatter({ day: 'numeric' }).format(date)}
    </Clickable>
  )
})

export interface CalendarCellButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  date: Date
  state: CalendarStateReturn
}
