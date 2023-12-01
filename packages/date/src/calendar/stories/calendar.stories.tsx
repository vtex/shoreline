import React, { useState } from 'react'
// import { Stack } from '@vtex/shoreline-components'

import { Calendar } from '../index'
import { LocaleProvider } from '@vtex/shoreline-components'

// import { parseDate } from '../../utils'

export default {
  title: 'date/calendar',
}

export function Default() {
  return <Calendar label="Event date" />
}

// export function Controlled() {
//   const [value, setValue] = useState(parseDate('2023-09-11'))

//   return <DateField value={value} onChange={setValue} label="Date" />
// }

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <Calendar label="Date" />
    </LocaleProvider>
  )
}

// export function Granularity() {
//   return (
//     <Stack>
//       <DateField label="Day (default)" granularity="day" locale="pt-BR" />
//       <DateField label="Hour" granularity="hour" locale="pt-BR" />
//       <DateField label="Minute" granularity="minute" locale="pt-BR" />
//       <DateField label="Second" granularity="second" locale="pt-BR" />
//     </Stack>
//   )
// }
