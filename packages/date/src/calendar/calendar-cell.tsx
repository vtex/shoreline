import React, { useRef } from 'react'
import { useCalendarCell } from '@react-aria/calendar'
import { IconButton } from '@vtex/shoreline-components'

import './calendar-cell.css'

export function CalendarCell({ state, date }: any) {
  const ref = useRef(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
    isFocused,
  } = useCalendarCell({ date }, state, ref)

  return (
    <td data-sl-calendar-cell {...cellProps}>
      <IconButton
        {...buttonProps}
        ref={ref}
        variant="tertiary"
        data-sl-calendar-cell-button
        hidden={isOutsideVisibleRange}
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
