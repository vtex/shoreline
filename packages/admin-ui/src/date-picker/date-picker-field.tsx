import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { IconCalendarBlank } from '@vtex/phosphor-icons'
import { ariaAttr } from '@vtex/admin-ui-util'

import { Text } from '../text'
import { DateField } from '../date-field'
import { Center } from '../center'
import { Picker, PickerDisclosure } from '../picker'
import type { DatePickerStateReturn } from './date-picker.state'
import { datePickerDisclosureTheme } from './date-picker.css'

export const DatePickerField = forwardRef(function DatePickerField(
  props: DatePickerFieldProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    state: { required, tone, pickerState, dateFieldState, disabled },
    label,
    helperText,
    criticalText,
    ...htmlProps
  } = props

  const isCritical = tone === 'critical'
  const hasCriticalMessage = tone === 'critical' && criticalText
  const hasMessage = helperText && !hasCriticalMessage

  return (
    <Picker
      ref={ref}
      aria-invalid={ariaAttr(isCritical)}
      aria-required={ariaAttr(required)}
      state={pickerState}
      {...htmlProps}
    >
      <DateField
        label={label}
        state={dateFieldState}
        tone={tone}
        disabled={disabled}
        disclosure={
          <PickerDisclosure
            state={pickerState}
            className={datePickerDisclosureTheme}
            data-disabled={disabled}
          >
            <Center>
              <IconCalendarBlank />
            </Center>
          </PickerDisclosure>
        }
      />
      {hasMessage && <Text variant="detail">{helperText}</Text>}
      {hasCriticalMessage && (
        <Text variant="detail" tone="critical">
          {criticalText}
        </Text>
      )}
    </Picker>
  )
})

DatePickerField.displayName = 'DatePickerField'

export interface DatePickerFieldProps extends ComponentPropsWithoutRef<'div'> {
  state: DatePickerStateReturn
  label: string
  helperText?: string
  criticalText?: string
}
