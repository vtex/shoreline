import { LocaleProvider } from '../../locale'

import { Calendar } from '../index'

export default {
  title: 'components/calendar',
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
  },
  args: {
    locale: 'en-US',
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

interface Args {
  locale: string
}

export function Play(args: Args) {
  return (
    <LocaleProvider locale={args.locale}>
      <Calendar />
    </LocaleProvider>
  )
}
