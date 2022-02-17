import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as style from './calendar.style'

export const CalendarHeader = createComponent<'header'>((props) => {
  return useElement('header', {
    baseStyle: style.calendarHeader,
    ...props,
  })
})
