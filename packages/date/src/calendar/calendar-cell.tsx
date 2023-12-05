import React, { useRef } from 'react'
import { useCalendarCell } from '@react-aria/calendar'
import { IconButton } from '@vtex/shoreline-components'

import './calendar-cell.css'
import { isRangeCalendar, useCalendarContext } from './calendar-provider'
import type { CalendarDate } from '../utils'
import { isSameDay } from '../utils'

/**
 * Cell of a calendar grid
 */
export function CalendarCell(props: CalendarCellProps) {
  const { date } = props
  const ref = useRef(null)
  const store = useCalendarContext()
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
    isFocused,
  } = useCalendarCell({ date }, store.state, ref)

  const isSelectionStart = isRangeCalendar(store.state)
    ? isSameDay(date, store.state?.highlightedRange?.start)
    : isSelected

  const isSelectionEnd = isRangeCalendar(store.state)
    ? isSameDay(date, store.state.highlightedRange.end)
    : isSelected

  return (
    <td data-sl-calendar-cell {...cellProps}>
      <IconButton
        {...buttonProps}
        ref={ref}
        variant="tertiary"
        data-sl-calendar-cell-button
        hidden={isOutsideVisibleRange}
        data-selection-start={isSelectionStart}
        data-selection-end={isSelectionEnd}
        data-selected={isSelected}
        data-disabled={isDisabled}
        data-unavailable={isUnavailable}
        data-focused={isFocused}
        label={formattedDate}
      >
        <span>{formattedDate}</span>
      </IconButton>
    </td>
  )
}

interface CalendarCellProps {
  /**
   * Date that the cell represents
   */
  date: CalendarDate
}
