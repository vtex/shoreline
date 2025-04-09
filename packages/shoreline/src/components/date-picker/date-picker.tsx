import { useRef } from 'react'
import type { AriaDatePickerProps } from '@react-aria/datepicker'
import { useDatePicker } from '@react-aria/datepicker'
import { useDatePickerState } from '@react-stately/datepicker'
import { IconButton } from '../icon-button'
import { Bleed } from '../bleed'
import { Popover, PopoverProvider, PopoverTrigger } from '../popover'
import { VisuallyHidden } from '../visually-hidden'

import { useFieldContext } from '../field'
import type { DateValue } from '@react-aria/calendar'
import { IconCalendarBlank } from '../../icons'

import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import { useStore } from '@vtex/shoreline-utils'

/**
 * A Date Picker is a field for single date values that may include time. The date can be typed or selected with the help of a Calendar.
 * @status stable
 * @example
 * <DatePicker />
 */
export function DatePicker<T extends DateValue>(props: DatePickerProps<T>) {
  const {
    className,
    id: defaultId,
    error: defaultError,
    portal = true,
    ...domProps
  } = props
  const state = useDatePickerState(domProps)
  const ref = useRef(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  const store = useFieldContext()
  const { id: contextId, error: contextError } = useStore(store, (s) => s)

  const id = defaultId || contextId
  const error = defaultError || contextError

  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker({ ...domProps, id }, state, ref)

  return (
    <PopoverProvider
      open={state.isOpen}
      setOpen={state.setOpen}
      placement="bottom-start"
    >
      <div ref={anchorRef} data-sl-date-picker className={className}>
        <VisuallyHidden>
          <div {...labelProps} />
        </VisuallyHidden>
        <div
          {...groupProps}
          ref={ref}
          data-sl-date-picker-input
          data-error={error}
        >
          <DateField id={id} {...fieldProps} />
          <Bleed end="$space-2">
            <PopoverTrigger asChild>
              <IconButton
                data-sl-date-picker-button
                id={buttonProps.id}
                label={buttonProps['aria-label']}
                aria-describedby={buttonProps['aria-describedby']}
                variant="tertiary"
                disabled={buttonProps.isDisabled}
              >
                <IconCalendarBlank />
              </IconButton>
            </PopoverTrigger>
          </Bleed>
        </div>
      </div>
      <Popover
        portal={portal}
        getAnchorRect={() => {
          if (anchorRef?.current) {
            return anchorRef.current.getBoundingClientRect()
          }

          return null
        }}
      >
        <Calendar {...calendarProps} />
      </Popover>
    </PopoverProvider>
  )
}

export interface DatePickerOptions<T extends DateValue>
  extends Omit<AriaDatePickerProps<T>, 'label'> {
  /**
   * Custom className
   */
  className?: string
  /**
   * Wether has error
   */
  error?: boolean
  /**
   * Should activate portal
   * @default true
   */
  portal?: boolean
}

export type DatePickerProps<T extends DateValue> = DatePickerOptions<T>
