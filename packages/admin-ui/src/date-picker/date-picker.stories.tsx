import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { I18nProvider } from '../i18n'
import { DatePicker, useDatePickerState } from './index'

export default {
  title: 'admin-ui/DatePicker',
  component: DatePicker,
} as Meta

export const Base = () => {
  const state = useDatePickerState({
    placement: 'bottom',
    unstable_offset: [-118, 12],
  })

  return <DatePicker state={state} />
}

const Localized = () => {
  const state = useDatePickerState({
    placement: 'bottom',
    unstable_offset: [-118, 12],
  })

  return <DatePicker state={state} />
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
