import React, { useRef } from 'react'
import type { AriaDateRangePickerProps } from '@react-aria/datepicker'
import { useDateRangePicker } from '@react-aria/datepicker'
import { useDateRangePickerState } from '@react-stately/datepicker'
import {
  IconButton,
  Popover,
  PopoverProvider,
  PopoverTrigger,
} from '@vtex/shoreline-components'
import type { DateValue } from '@react-aria/calendar'
import { IconCalendarBlank } from '@vtex/shoreline-icons'

import { RangeCalendar } from '../range-calendar'
import { DateInput } from '../date-input'
import './date-range-picker.css'

/**
 * Allow users to pick a date range
 * @example
 * <DateRangePicker />
 */
export function DateRangePicker<T extends DateValue>(
  props: DateRangePickerProps<T>
) {
  const state = useDateRangePickerState(props)
  const ref = useRef(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref)

  return (
    <PopoverProvider
      open={state.isOpen}
      setOpen={state.setOpen}
      placement="bottom-start"
    >
      <div ref={anchorRef} data-sl-date-range-picker>
        <div {...labelProps}>{props.label}</div>
        <div data-sl-date-range-picker-group {...groupProps} ref={ref}>
          <DateInput {...startFieldProps} />
          <span>-</span>
          <DateInput {...endFieldProps} />
          <PopoverTrigger asChild>
            <IconButton
              id={buttonProps.id}
              label={buttonProps['aria-label']}
              aria-describedby={buttonProps['aria-describedby']}
              size="large"
              variant="tertiary"
              data-sl-date-range-picker-icon-button
            >
              <IconCalendarBlank />
            </IconButton>
          </PopoverTrigger>
        </div>
      </div>
      <Popover
        getAnchorRect={() => {
          if (anchorRef && anchorRef.current) {
            return anchorRef.current.getBoundingClientRect()
          }

          return null
        }}
      >
        <RangeCalendar {...calendarProps} />
      </Popover>
    </PopoverProvider>
  )
}

export type DateRangePickerProps<T extends DateValue> =
  AriaDateRangePickerProps<T>
