import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ValueBase } from '@react-types/shared'

import { useCalendarState } from '../calendar'
import type { PickerInitialState } from '../picker'
import { usePickerState } from '../picker'
import type { DateFieldInitialState } from '../date-field'
import { useDateFieldState } from '../date-field'
import type { DateObject } from '../calendar/utils'
import { getDateObject, createDate } from '../calendar/utils'
import type { CalendarInitialState } from '../calendar'

export type DatePickerInitialState =
  ValueBase<string> & {} & PickerInitialState &
    Pick<Partial<DateFieldInitialState>, 'formatOptions' | 'placeholder'> &
    Pick<CalendarInitialState, 'minValue' | 'maxValue' | 'defaultValue'> & {
      /**
       * Whether should receive focus on render
       * @default false
       */
      autoFocus?: boolean
      /**
       * Whether is invalid
       * @default false
       */
      invalid?: boolean
      /**
       * Whether is required
       * @default false
       */
      required?: boolean
      /**
       * Whether is disabled
       * @default false
       */
      disabled?: boolean
    }

export const useDatePickerState = (props: DatePickerInitialState = {}) => {
  const {
    defaultValue = getDateObject(),
    minValue,
    maxValue,
    invalid: invalidProp = false,
    required = false,
    autoFocus = false,
    disabled = false,
    formatOptions,
    placeholder,
  } = props

  const [value, setValue] = useState(defaultValue)

  const date = useMemo(() => createDate(value), [value])
  const setDate = (date: Date) => setValue(getDateObject(date))

  const dateFieldState = useDateFieldState({
    value: date,
    onChange: setDate,
    formatOptions,
    placeholder,
  })

  const pickerState = usePickerState({
    segmentFocus: dateFieldState.first,
    placement: 'bottom',
    unstable_offset: [-106, 12],
    isDisabled: disabled,
    ...props,
  })

  const selectDate = useCallback(
    (newValue: DateObject) => {
      setValue(newValue)
      dateFieldState.resetPlaceholder()
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

  useEffect(() => {
    if (pickerState.visible) {
      calendarState.setFocused(true)
      calendarState.focusCell(date)
    }
  }, [pickerState.visible])

  useEffect(() => {
    if (autoFocus) {
      dateFieldState.first()
    }
  }, [autoFocus, dateFieldState.first])

  const invalid = useMemo(() => {
    const outOfBounds =
      date < calendarState.minDateValue || date > calendarState.maxDateValue

    return invalidProp || outOfBounds
  }, [invalidProp, date])

  return {
    dateValue: value,
    setDateValue: setValue,
    selectDate,
    required,
    disabled,
    calendarState,
    invalid,
    pickerState,
    dateFieldState,
  }
}

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>
