import React from 'react'
import { LocaleProvider } from '@vtex/shoreline-components'

import { DatePicker } from '../index'
// import { getLocalTimeZone, today } from '../../utils'

export default {
  title: 'date/date-picker',
}

export function Default() {
  return <DatePicker label="Date" />
}

// export function Controlled() {
//   const now = today(getLocalTimeZone())
//   const [value, setValue] = useState(now)
//   const [focusedValue, setFocusedValue] = useState(now)

//   return (
//     <>
//       <p>Selected Date: {value.toString()}</p>
//       <p>Focused Date: {focusedValue.toString()}</p>

//       <button
//         onClick={() => {
//           setValue(now)
//           setFocusedValue(now)
//         }}
//       >
//         Today
//       </button>
//       <Calendar
//         value={value}
//         onChange={setValue}
//         focusedValue={focusedValue}
//         onFocusChange={setFocusedValue}
//       />
//     </>
//   )
// }

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <DatePicker label="日付" />
    </LocaleProvider>
  )
}
