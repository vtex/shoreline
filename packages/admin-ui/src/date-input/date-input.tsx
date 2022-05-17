import React from 'react'
import { IconCalendarBlank } from '@vtex/phosphor-icons'

import type { TextInputProps } from '../text-input'
import { TextInput } from '../text-input'
import { useDateInput } from './use-date-input'

export function DateInput(props: DateInputProps) {
  const { onChange, value, asDate, ...rest } = props

  const { getInputProps } = useDateInput({
    onChange,
    value,
    asDate,
  })

  return (
    <TextInput
      prefix={<IconCalendarBlank />}
      {...getInputProps({
        ...rest,
        // value: value.stringValue,
      })}
    />
  )
}

export type DateInputProps = Omit<TextInputProps, 'prefix'>
