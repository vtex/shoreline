import React, { useRef } from 'react'
import { useDateFieldState } from 'react-stately'
import { useDateField, useLocale } from 'react-aria'
import { createCalendar } from '@internationalized/date'

import { DateSegment } from './date-segment'
import { wrapperTheme, fieldTheme } from './date-field.css'

export function DateField(props: any) {
  const { locale } = useLocale()
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const { labelProps, fieldProps } = useDateField(props, state, ref)

  return (
    <div className={wrapperTheme}>
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className={fieldTheme}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === 'invalid' && (
          <span aria-hidden="true">🚫</span>
        )}
      </div>
    </div>
  )
}
