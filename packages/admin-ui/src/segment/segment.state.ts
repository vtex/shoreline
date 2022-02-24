import { useEffect, useMemo, useRef } from 'react'
import { useCompositeState } from 'reakit'
import type { AnyObject } from '@vtex/admin-ui-util'
import { get } from '@vtex/admin-ui-util'
import { useControllableState } from '@vtex/admin-ui-hooks'

import { useDateFormatter } from '../i18n'
import { add, getSegmentLimits, setSegment } from './util'

const EDITABLE_SEGMENTS = {
  year: true,
  month: true,
  day: true,
  hour: true,
  minute: true,
  second: true,
  dayPeriod: true,
}

const PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
}

const RESET_PlACEHOLDER = {
  day: false,
  month: false,
  year: false,
}

const DISPLAY_PlACEHOLDER = {
  day: true,
  month: true,
  year: true,
}

const TYPO_MAPPING = {
  dayperiod: 'dayPeriod',
}

export function useSegmentState(props: SegmentInitialState = {}) {
  const {
    value,
    onChange,
    defaultValue = new Date(),
    formatOptions,
    placeholder,
  } = props

  const segmentComposite = useCompositeState({ orientation: 'horizontal' })
  const validSegments = useRef<AnyObject>(EDITABLE_SEGMENTS)
  const dateFormatter = useDateFormatter(formatOptions)

  const showPlaceholder = useRef<AnyObject>(
    placeholder ? DISPLAY_PlACEHOLDER : RESET_PlACEHOLDER
  )

  const resolvedOptions = useMemo(
    () => dateFormatter.resolvedOptions(),
    [dateFormatter]
  )

  const numSegments = useMemo(
    () =>
      dateFormatter
        .formatToParts(new Date())
        .filter((seg) => get(EDITABLE_SEGMENTS, seg.type)).length,
    [dateFormatter]
  )

  const [date, setDate] = useControllableState<Date>({
    value,
    defaultValue,
    onChange,
  })

  const segments = useMemo(
    () =>
      dateFormatter.formatToParts(date).map(
        (segment) =>
          ({
            type: get(TYPO_MAPPING, segment.type) || segment.type,
            text: segment.value,
            placeholder: get(placeholder, segment.type),
            ...getSegmentLimits(date, segment.type, resolvedOptions),
          } as DateSegment)
      ),
    [resolvedOptions, dateFormatter, placeholder, date]
  )

  useEffect(() => {
    if (value && Object.keys(validSegments.current).length < numSegments) {
      validSegments.current = EDITABLE_SEGMENTS
    }
  }, [value, numSegments])

  const adjustSegment = (
    type: Intl.DateTimeFormatPartTypes,
    amount: number
  ) => {
    validSegments.current[type] = true
    showPlaceholder.current[type] = false
    setDate(add(date, type, amount, resolvedOptions) as Date)
  }

  const resetPlaceholder = () => {
    showPlaceholder.current = RESET_PlACEHOLDER
  }

  const displayPlaceholder = () => {
    showPlaceholder.current = DISPLAY_PlACEHOLDER
  }

  return {
    ...segmentComposite,
    showPlaceholder,
    fieldValue: date,
    setFieldValue: setDate,
    segments,
    dateFormatter,
    resetPlaceholder,
    displayPlaceholder,
    increment(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, 1)
    },
    decrement(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, -1)
    },
    incrementPage(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, get(PAGE_STEP, part) || 1)
    },
    decrementPage(part: Intl.DateTimeFormatPartTypes) {
      adjustSegment(part, -(get(PAGE_STEP, part) || 1))
    },
    setSegment(part: Intl.DateTimeFormatPartTypes, v: number) {
      validSegments.current[part] = true
      setDate(setSegment(date, part, v, resolvedOptions))
    },
  }
}

export interface ControllableState<T> {
  /**
   * value for uncontrolled mode
   */
  defaultValue?: T
  /**
   * value for controlled mode
   */
  value?: T
  /**
   * onChange for controlled mode
   */
  onChange?: (value: T, ...args: any[]) => void
}

export interface SegmentInitialState extends ControllableState<Date> {
  /**
   * Sets formmating of date based on Intl.DateFormatOptions
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
   *
   * @example
   * {
   *   year: "numeric",
   *   month: "2-digit",
   *   day: "2-digit",
   *   weekday: "long",
   * }
   */
  formatOptions?: Intl.DateTimeFormatOptions
  placeholder?: {
    year: string
    month: string
    day: string
  }
}

export interface DateSegment {
  type: Intl.DateTimeFormatPartTypes
  text: string
  value?: number
  minValue?: number
  maxValue?: number
  placeholder?: string
}

export type SegmentStateReturn = ReturnType<typeof useSegmentState>
