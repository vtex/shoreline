import React, { useEffect, useState } from 'react'
import type {
  Validation,
  ValidationState,
  ValueBase,
} from '@react-types/shared'

import { useCalendarState } from '../calendar'
import type { PickerInitialState } from '../picker'
import { usePickerState } from '../picker'
import type { SegmentInitialState } from '../date-field'
import { useSegmentState } from '../date-field'
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

  // todo implement onchange w/ hoks
  const segmentState = useSegmentState({
    value: date,
    formatOptions,
  })

  const selectorState = usePickerState({
    segmentFocus: segmentState.first,
    ...props,
  })

  const selectDate = (newValue: string) => {
    setValue(newValue)
    selectorState.hide()
  }

  // todo implement onchange w/ hooks
  const calendar = useCalendarState({
    value,
    // onChange: selectDate,
    minValue,
    maxValue,
  })

  const validationState: ValidationState =
    props.validationState || (isInvalidDateRange(date) ? 'invalid' : 'valid')

  React.useEffect(() => {
    if (selectorState.visible) {
      calendar.setFocused(true)
      calendar.focusCell(date)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorState.visible])

  React.useEffect(() => {
    if (autoFocus) {
      segmentState.first()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, segmentState.first])

  function isInvalidDateRange(value: Date) {
    const min = new Date(minDateValue)
    const max = new Date(maxDateValue)

    return value < min || value > max
  }

  return {
    dateValue: value,
    setDateValue: setValue,
    selectDate,
    validationState,
    minValue,
    maxValue,
    isRequired,
    selectorState,
    segmentState,
    calendar,
  }
}

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>
