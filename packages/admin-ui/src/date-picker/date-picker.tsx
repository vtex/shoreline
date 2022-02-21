import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import { IconCalendarPlus } from '@vtex/phosphor-icons'
import { ariaAttr } from '@vtex/admin-ui-util'

import { DateField } from '../date-field'
import { DatePickerSegment } from './date-picker-segment'
import { Picker, PickerDisclosure, PickerPopover } from '../picker'
import { Calendar } from '../calendar'
import type { DatePickerStateReturn } from './date-picker-state'

export function DatePicker(props: DatePickerProps) {
  const { state, label = 'Date' } = props

  return (
    <>
      <Picker
        csx={{
          position: 'relative',
          display: 'inline-block',
          height: 48,
          width: 296,
        }}
        aria-invalid={ariaAttr(state.validationState === 'invalid')}
        aria-required={ariaAttr(state.isRequired)}
        state={state.pickerState}
      >
        <tag.label
          csx={{
            text: '$body',
            fontSize: 1,
            left: 12,
            paddingTop: 2,
            color: '$secondary',
            marginBottom: 3,
            position: 'absolute',
          }}
        >
          {label}
        </tag.label>
        <tag.div
          csx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 1,
            paddingY: 2,
            paddingX: 3,
            border: '$neutral',
            borderRadius: 4,
          }}
        >
          <DateField
            state={state.dateFieldState}
            csx={{
              display: 'flex',
              paddingTop: 3,
            }}
          >
            {state.dateFieldState.segments.map((segment, i) => (
              <DatePickerSegment key={i} segment={segment} state={state} />
            ))}
          </DateField>
          <PickerDisclosure
            state={state.pickerState}
            csx={{
              cursor: 'pointer',
              text: '$body',
              color: '$secondary',
              bg: '$action.neutral.tertiary',
              borderRadius: 4,
              ':hover': {
                bg: '$action.neutral.tertiaryHover',
                color: '$action.neutral.tertiaryPressed',
              },
              ':active': {
                bg: '$action.neutral.tertiaryPressed',
                color: '$action.neutral.tertiaryPressed',
              },
              ':focus': {
                bg: '$inverted',
                color: '$inverted',
                outline: 'none',
              },
            }}
          >
            <IconCalendarPlus />
          </PickerDisclosure>
        </tag.div>
      </Picker>
      <PickerPopover
        csx={{
          bg: '$primary',
          border: '$neutral',
          borderRadius: 4,
          width: 296,
        }}
        state={state.pickerState}
      >
        <Calendar state={state.calendarState} />
      </PickerPopover>
    </>
  )
}

interface DatePickerProps {
  state: DatePickerStateReturn
  label?: string
}
