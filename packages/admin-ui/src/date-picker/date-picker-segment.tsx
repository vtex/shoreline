import { unstable_useId as useId } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { DateFieldSegment } from '../date-field'
import type { DatePickerStateReturn } from './date-picker-state'

export const DatePickerSegment = createComponent<
  typeof DateFieldSegment,
  DatePickerSegmentOptions
>((props) => {
  const {
    state: { dateFieldState },
    segment,
    ...htmlProps
  } = props

  const { id } = useId({ baseId: 'datepicker-segment' })

  return useElement(DateFieldSegment, {
    id,
    'aria-labelledby': id,
    segment,
    state: dateFieldState,
    ...htmlProps,
  })
})

export interface DatePickerSegmentOptions {
  state: DatePickerStateReturn
  segment: any
}
