import { useMemo, useState, useRef } from 'react'
import { useCompositeState } from 'reakit'
import { get } from '@vtex/admin-ui-util'
import { useControllableState } from '@vtex/admin-ui-hooks'

import { useDateFormatter } from '../i18n'
import { add, convertValue, getSegmentLimits, setSegment } from './util'

export interface DateSegmentProps {
  type: Intl.DateTimeFormatPartTypes
  text: string
  value?: number
  minValue?: number
  maxValue?: number
  isPlaceholder: boolean
}

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

// for node
const TYPO_MAPPING = {
  dayperiod: 'dayPeriod',
}

export interface SegmentInitialState {
  /**
   * Default segment value
   */
  defaultValue?: Date
  /**
   * Segment value
   */
  value?: Date
  /**
   * Callback to fire on value change
   */
  onChange?: (value: Date, ...args: any[]) => void
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
   *
   */
  formatOptions?: Intl.DateTimeFormatOptions
  /**
   * Placeholder date
   */
  placeholderDate?: Date
}

export function useDateFieldState(props: SegmentInitialState) {
  const validSegments = useRef<Record<string, any>>(
    props.value || props.defaultValue ? { ...EDITABLE_SEGMENTS } : {}
  )

  const dateFormatter = useDateFormatter(props.formatOptions)

  const resolvedOptions = useMemo(
    () => dateFormatter.resolvedOptions(),
    [dateFormatter]
  )

  // Determine how many editable segments there are for validation purposes.
  // The result is cached for performance.
  const numSegments = useMemo(
    () =>
      dateFormatter
        .formatToParts(new Date())
        .filter((seg) => get(EDITABLE_SEGMENTS, seg.type)).length,
    [dateFormatter]
  )

  // If there is a value prop, and some segments were previously placeholders, mark them all as valid.
  if (props.value && Object.keys(validSegments.current).length < numSegments) {
    validSegments.current = EDITABLE_SEGMENTS
  }

  // We keep track of the placeholder date separately in state so that onChange is not called
  // until all segments are set. If the value === null (not undefined), then assume the component
  // is controlled, so use the placeholder as the value until all segments are entered so it doesn't
  // change from uncontrolled to controlled and emit a warning.
  const [placeholderDate, setPlaceholderDate] = useState(
    convertValue(props.placeholderDate) ||
      new Date(new Date().getFullYear(), 0, 1)
  )

  const [date, setDate] = useControllableState<Date>({
    value:
      props.value === null
        ? convertValue(placeholderDate)
        : convertValue(props.value),
    defaultValue: convertValue(props.defaultValue),
    onChange: props.onChange,
  })

  // If all segments are valid, use the date from state, otherwise use the placeholder date.
  const value =
    Object.keys(validSegments.current).length >= numSegments
      ? date
      : placeholderDate

  const setValue = (value: Date) => {
    if (Object.keys(validSegments.current).length >= numSegments) {
      setDate(value)
    } else {
      setPlaceholderDate(value)
    }
  }

  const segments = dateFormatter.formatToParts(value).map(
    (segment) =>
      ({
        type: get(TYPO_MAPPING, segment.type) || segment.type,
        text: segment.value,
        ...getSegmentLimits(value, segment.type, resolvedOptions),
        isPlaceholder: !validSegments.current[segment.type],
      } as DateSegmentProps)
  )

  const adjustSegment = (
    type: Intl.DateTimeFormatPartTypes,
    amount: number
  ) => {
    validSegments.current[type] = true
    setValue(add(value, type, amount, resolvedOptions) as Date)
  }

  const segmentComposite = useCompositeState({ orientation: 'horizontal' })

  return {
    ...segmentComposite,
    fieldValue: value,
    setFieldValue: setValue,
    segments,
    dateFormatter,
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
      setValue(setSegment(value, part, v, resolvedOptions))
    },
    confirmPlaceholder(part: Intl.DateTimeFormatPartTypes) {
      validSegments.current[part] = true
      setValue(new Date(value))
    },
  }
}

export type SegmentStateReturn = ReturnType<typeof useDateFieldState>
