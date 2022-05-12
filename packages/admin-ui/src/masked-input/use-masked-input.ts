import React, { useMemo } from 'react'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

import { useDeleteKeyPressed } from './use-delete-key-pressed'
import { useForceUpdate } from './use-force-update'

/**
 * React hook that handles masking of any input given a value and formatter.
 * @example
 * const [value, onChange] = React.useState('')
 *
 * const formatter = useFormatter({
 *  mask: '__/__/____',
 *  accept: /[\d]/gi
 * })
 *
 * const inputProps = useMaskedInput({
 *  value,
 *  formatter,
 *  onChange,
 * })
 *
 * <input {...inputProps} />
 */
export function useMaskedInput(
  props: UseMaskedInputProps
): UseMaskedInputReturn {
  const { formatter, value, onChange, accept = /\d/g } = props

  const valueRef = React.useRef<ValueRef | null>(null)
  const userValue = useMemo(() => formatter(value), [formatter, value])
  const isDeleteKeyPressed = useDeleteKeyPressed()
  const forceUpdate = useForceUpdate()

  const forwardedOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = evt.target.value

    valueRef.current = {
      eventValue,
      input: evt.target,
      hasSizeIncrease: eventValue.length > userValue.length,
      pressedDelete: isDeleteKeyPressed(),
      hasNoChanges: userValue === formatter(eventValue),
    }

    forceUpdate()
  }

  useSafeLayoutEffect(() => {
    if (valueRef.current === null) return

    const { eventValue, input, hasSizeIncrease, pressedDelete, hasNoChanges } =
      valueRef.current

    valueRef.current = null

    const deleteCausesNoChanges = pressedDelete && hasNoChanges
    const valueAfterSelectionStart = eventValue.slice(
      input?.selectionStart ?? undefined
    )

    const acceptedCharIndexAfterDelete = valueAfterSelectionStart.search(accept)
    const charsToSkipAfterDelete =
      acceptedCharIndexAfterDelete !== -1 ? acceptedCharIndexAfterDelete : 0

    const valueBeforeSelectionStart = clean(
      eventValue.substring(0, input?.selectionStart ?? undefined),
      accept
    )

    const formattedValue = formatter(eventValue)

    if (userValue === formattedValue) {
      forceUpdate()
    } else {
      onChange(formattedValue)
    }

    return () => {
      let start = getCursorPosition({
        formattedValue,
        valueBeforeSelectionStart,
        accept,
      })

      if (hasSizeIncrease || (pressedDelete && !deleteCausesNoChanges)) {
        while (
          formattedValue[start] &&
          clean(formattedValue[start], accept) === ''
        ) {
          start += 1
        }
      }

      const positionsToAdd = deleteCausesNoChanges
        ? charsToSkipAfterDelete + 1
        : 0

      const cursorPosition = start + positionsToAdd

      input.selectionEnd = cursorPosition
      input.selectionStart = cursorPosition
    }
  })

  return {
    value: valueRef.current !== null ? valueRef.current.eventValue : userValue,
    onChange: forwardedOnChange,
  }
}

/**
 * Create string from only accepted symbols
 */
function clean(str: string, accept: RegExp) {
  return (str.match(accept) || []).join('')
}

/**
 * Finds the correct current start based on the formatted value
 */
function getCursorPosition(cursor: Cursor) {
  const { formattedValue, valueBeforeSelectionStart, accept } = cursor

  let start = 0
  let cleanPos = 0

  for (let i = 0; i !== valueBeforeSelectionStart.length; ++i) {
    let newPos = formattedValue.indexOf(valueBeforeSelectionStart[i], start) + 1

    let newCleanPos =
      clean(formattedValue, accept).indexOf(
        valueBeforeSelectionStart[i],
        cleanPos
      ) + 1

    if (newCleanPos - cleanPos > 1) {
      newPos = start
      newCleanPos = cleanPos
    }

    cleanPos = Math.max(newCleanPos, cleanPos)
    start = Math.max(start, newPos)
  }

  return start
}

interface Cursor {
  /** current formatted value */
  formattedValue: string
  /** previous value of the start cursor */
  valueBeforeSelectionStart: string
  /** accept regex */
  accept: RegExp
}

interface ValueRef {
  /** event value */
  eventValue: string
  /** input that the event targets */
  input: EventTarget & HTMLInputElement
  /** if the length of the draft value is greather than the current */
  hasSizeIncrease: boolean
  /** whether delete is pressed */
  pressedDelete: boolean
  /** if the draft value is equal to currrent */
  hasNoChanges: boolean
}

export interface UseMaskedInputProps {
  /** input state value */
  value: string
  /** onChange function */
  onChange: (str: string) => void
  /** formatter */
  formatter: (str: string) => string
  /** accept regex */
  accept?: RegExp
}

export interface UseMaskedInputReturn {
  /** value of the input */
  value: string
  /** onChange event */
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
