import React from 'react'
import { LocaleProvider } from '@vtex/shoreline-components'

import { DatePicker } from '../index'

export default {
  title: 'components/date-picker',
  argTypes: {
    locale: {
      options: [
        'en-US',
        'pt-BR',
        'es-AR',
        'de-DE',
        'bg-BG',
        'fr-FR',
        'it-IT',
        'ja-JP',
        'ko-KO',
        'nl-NL',
        'ro-RO',
        'th-TH',
      ],
      control: { type: 'radio' },
      description: 'Language of the calendar',
    },
    error: {
      control: { type: 'boolean' },
      description: '',
    },
  },
  args: {
    locale: 'en-US',
    error: false,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

interface Args {
  locale: string
  error?: boolean
}

export function Play(args: Args) {
  return (
    <LocaleProvider locale={args.locale}>
      <DatePicker />
    </LocaleProvider>
  )
}
