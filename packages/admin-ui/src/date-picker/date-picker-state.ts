import React, { useCallback, useState } from 'react'
import type {
  Validation,
  ValidationState,
  ValueBase,
} from '@react-types/shared'

import { useCalendarState } from '../calendar'
import type { PickerInitialState } from '../picker'
import { usePickerState } from '../picker'
import type { SegmentInitialState } from '../date-field'
import { useDateFieldState } from '../date-field'
import { toUTCString } from '../calendar/utils'
import type { RangeValueMinMax } from '../calendar'

export type DatePickerInitialState = ValueBase<string> &
  RangeValueMinMax &
  Validation &
  PickerInitialState &
  Pick<Partial<SegmentInitialState>, 'formatOptions' | 'placeholderDate'> & {
    /**
     * Whether the element should receive focus on render.
     */
    autoFocus?: boolean
  }

export const useDatePickerState = (props: DatePickerInitialState = {}) => {
  const {
    defaultValue = toUTCString(new Date()),
    minValue,
    maxValue,
    isRequired,
    autoFocus,
    formatOptions,
  } = props

  const [value, setValue] = useState(defaultValue)

  const date = new Date(value)
  const setDate = (date: Date) => setValue(toUTCString(date))
  const minDateValue = minValue ? new Date(minValue) : new Date(-864e13)
  const maxDateValue = maxValue ? new Date(maxValue) : new Date(864e13)

  const dateFieldState = useDateFieldState({
    value: date,
    onChange: setDate,
    formatOptions,
  })

  const pickerState = usePickerState({
    segmentFocus: dateFieldState.first,
    placement: 'bottom',
    unstable_offset: [-112, 12],
    ...props,
  })

  const selectDate = useCallback(
    (newValue: string) => {
      setValue(newValue)
      pickerState.hide()
    },
    [pickerState.hide]
  )

  const calendarState = useCalendarState({
    value,
    onChange: selectDate,
    minValue,
    maxValue,
  })

  const validationState: ValidationState =
    props.validationState || (isInvalidDateRange(date) ? 'invalid' : 'valid')

  React.useEffect(() => {
    if (pickerState.visible) {
      calendarState.setFocused(true)
      calendarState.focusCell(date)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickerState.visible])

  React.useEffect(() => {
    if (autoFocus) {
      dateFieldState.first()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, dateFieldState.first])

  function isInvalidDateRange(value: Date) {
    const min = new Date(minDateValue)
    const max = new Date(maxDateValue)

    return value < min || value > max
  }

  return {
    dateValue: value,
    setDateValue: setValue,
    selectDate,
    minValue,
    maxValue,
    isRequired,
    calendarState,
    validationState,
    pickerState,
    dateFieldState,
  }
}

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>
