import React from 'react'
import type { Meta } from '@storybook/react'

import { Calendar, useCalendarState } from './index'
import { I18nProvider } from '../i18n'

export default {
  title: 'admin-ui/Calendar',
} as Meta

export function Basic() {
  const state = useCalendarState()

  return <Calendar state={state} />
}

export function I18n() {
  return (
    <I18nProvider locale="ja-JP">
      <Basic />
    </I18nProvider>
  )
}
