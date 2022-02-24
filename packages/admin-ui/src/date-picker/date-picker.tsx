import React from 'react'
import { IconCalendar } from '@vtex/phosphor-icons'
import { ariaAttr } from '@vtex/admin-ui-util'

import { DateField } from '../date-field'
import { Picker, PickerDisclosure, PickerPopover } from '../picker'
import { Calendar } from '../calendar'
import type { DatePickerStateReturn } from './date-picker-state'
import * as style from './date-picker.style'

export function DatePicker(props: DatePickerProps) {
  const {
    state: {
      validationState,
      isRequired,
      pickerState,
      dateFieldState,
      calendarState,
    },
    label,
  } = props

  return (
    <>
      <Picker
        aria-invalid={ariaAttr(validationState === 'invalid')}
        aria-required={ariaAttr(isRequired)}
        state={pickerState}
      >
        <DateField
          label={label}
          state={dateFieldState}
          disclosure={
            <PickerDisclosure state={pickerState} csx={style.disclosure}>
              <IconCalendar />
            </PickerDisclosure>
          }
        />
      </Picker>
      <PickerPopover state={pickerState}>
        <Calendar state={calendarState} />
      </PickerPopover>
    </>
  )
}

interface DatePickerProps {
  state: DatePickerStateReturn
  label: string
}
