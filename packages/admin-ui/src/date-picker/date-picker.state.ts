import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ValueBase } from '@react-types/shared'

import { useCalendarState } from '../calendar'
import type { PickerInitialState } from '../picker'
import { usePickerState } from '../picker'
import type { DateFieldInitialState } from '../date-field'
import { useDateFieldState } from '../date-field'
import { toUTCString } from '../calendar/utils'
// import type { RangeValueMinMax } from '../calendar'

export type DatePickerInitialState =
  ValueBase<string> & {} & PickerInitialState &
    Pick<Partial<DateFieldInitialState>, 'formatOptions' | 'placeholder'> & {
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

// TODO: support min-max values
export const useDatePickerState = (props: DatePickerInitialState = {}) => {
  const {
    defaultValue = toUTCString(new Date()),
    // minValue,
    // maxValue,
    invalid: invalidProp = false,
    required = false,
    autoFocus = false,
    disabled = false,
    formatOptions,
    placeholder,
  } = props

  const [value, setValue] = useState(defaultValue)

  const date = new Date(value)
  const setDate = (date: Date) => setValue(toUTCString(date))
  // const minDateValue = minValue ? new Date(minValue) : new Date(-864e13)
  // const maxDateValue = maxValue ? new Date(maxValue) : new Date(864e13)

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
    (newValue: string) => {
      setValue(newValue)
      dateFieldState.resetPlaceholder()
      pickerState.hide()
    },
    [pickerState.hide]
  )

  const calendarState = useCalendarState({
    value,
    onChange: selectDate,
    // minValue,
    // maxValue,
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
    // const min = new Date(minDateValue)
    // const max = new Date(maxDateValue)
    // return value < min || value > max

    return invalidProp
  }, [invalidProp])

  return {
    dateValue: value,
    setDateValue: setValue,
    selectDate,
    // minValue,
    // maxValue,
    required,
    disabled,
    calendarState,
    invalid,
    pickerState,
    dateFieldState,
  }
}

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>
