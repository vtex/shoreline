import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { I18nProvider } from '../i18n'
import { DatePicker, useDatePickerState } from './index'

export default {
  title: 'admin-ui/DatePicker',
  component: DatePicker,
} as Meta

export const Base: Story<{
  validationState: 'valid' | 'invalid'
  label: string
}> = (args) => {
  const { validationState } = args

  const state = useDatePickerState({
    validationState,
  })

  return <DatePicker label="Date" state={state} />
}

Base.parameters = {
  validationState: 'valid',
}

Base.argTypes = {
  validationState: {
    options: ['valid', 'invalid'],
    control: { type: 'radio' },
  },
}

const Localized = () => {
  const state = useDatePickerState({
    placeholder: {
      month: 'MM',
      day: 'DD',
      year: 'YYYY',
    },
  })

  return <DatePicker label="Date" state={state} />
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
