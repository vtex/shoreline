import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { I18nProvider } from '../i18n'
import {
  DatePickerField,
  DatePickerCalendar,
  useDatePickerState,
} from './index'

export default {
  title: 'admin-ui/DatePicker',
  component: DatePickerField,
} as Meta

export const Base: Story<{
  invalid: boolean
  disabled: boolean
  label: string
}> = (args) => {
  const { invalid, disabled } = args

  const state = useDatePickerState({
    invalid,
    disabled,
  })

  return (
    <>
      <DatePickerField label="Date" state={state} />
      <DatePickerCalendar state={state} />
    </>
  )
}

Base.parameters = {
  invalid: false,
  disabled: false,
}

Base.argTypes = {
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
}

export const MinMax: Story = () => {
  const state = useDatePickerState({
    minValue: {
      year: 2022,
      month: 2,
      day: 29,
    },
    maxValue: {
      year: 2023,
      month: 11,
      day: 21,
    },
  })

  return (
    <>
      <DatePickerField
        label="Date"
        state={state}
        helperText="Release date"
        criticalText="Date out of Bounds"
      />
      <DatePickerCalendar state={state} />
    </>
  )
}

const Localized = () => {
  const state = useDatePickerState({
    placeholder: {
      month: 'MM',
      day: 'DD',
      year: 'YYYY',
    },
  })

  return (
    <>
      <DatePickerField label="Date" state={state} />
      <DatePickerCalendar state={state} />
    </>
  )
}

export const Internationalized: Story<{ locale: string }> = (args) => {
  return (
    <I18nProvider locale={args.locale}>
      <Localized />
    </I18nProvider>
  )
}

Internationalized.argTypes = {
  locale: {
    options: [
      'en-US',
      'pt-BR',
      'ko-KR',
      'ja-JP',
      'zh-CN',
      'ro-RO',
      'fr-FR',
      'es-AR',
    ],
    control: { type: 'select' },
  },
}
