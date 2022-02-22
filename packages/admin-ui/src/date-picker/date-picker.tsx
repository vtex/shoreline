import React from 'react'
import { IconCalendar } from '@vtex/phosphor-icons'
import { ariaAttr } from '@vtex/admin-ui-util'
import { Flex } from '../components/Flex'
import { Label } from '../components/Label'

import { DateField } from '../date-field'
import { DatePickerSegment } from './date-picker-segment'
import { Picker, PickerDisclosure, PickerPopover } from '../picker'
import { Calendar } from '../calendar'
import type { DatePickerStateReturn } from './date-picker-state'
import * as style from './date-picker.style'

export function DatePicker(props: DatePickerProps) {
  const { state, label } = props

  return (
    <>
      <Picker
        csx={style.datePicker}
        aria-invalid={ariaAttr(state.validationState === 'invalid')}
        aria-required={ariaAttr(state.isRequired)}
        state={state.pickerState}
      >
        <Flex align="center" justify="space-between">
          <Flex direction="column">
            <Label csx={style.datePickerLabel}>{label}</Label>
            <DateField state={state.dateFieldState}>
              {state.dateFieldState.segments.map((segment, i) => (
                <DatePickerSegment key={i} segment={segment} state={state} />
              ))}
            </DateField>
          </Flex>
          <PickerDisclosure
            state={state.pickerState}
            csx={style.datePickerDisclosure}
          >
            <IconCalendar />
          </PickerDisclosure>
        </Flex>
      </Picker>
      <PickerPopover state={state.pickerState}>
        <Calendar state={state.calendarState} />
      </PickerPopover>
    </>
  )
}

interface DatePickerProps {
  state: DatePickerStateReturn
  label: string
}
