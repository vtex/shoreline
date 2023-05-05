import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { PickerPopover } from '../picker'
import { Calendar } from '../calendar'
import type { DatePickerStateReturn } from './date-picker.state'

export const DatePickerCalendar = forwardRef(function DatePickerCalendar(
  props: DatePickerCalendarProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    state: { pickerState, calendarState },
    ...htmlProps
  } = props

  return (
    <PickerPopover ref={ref} state={pickerState} {...htmlProps}>
      <Calendar state={calendarState} />
    </PickerPopover>
  )
})

export interface DatePickerCalendarProps
  extends ComponentPropsWithoutRef<'div'> {
  state: DatePickerStateReturn
}
