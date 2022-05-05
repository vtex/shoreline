import React, { useMemo } from 'react'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

import { useDeleteKeyPressed } from './use-delete-key-pressed'
import { useRerender } from './use-rerender'

/**
 * React hook that handles masking of any input given a value and formatter.
 * @example
 * const [value, setValue] = React.useState('')
 *
 * const formatter = useFormatter({
 *  mask: '__/__/___',
 *  accept: /[\d]/gi
 * })
 *
 * const inputProps = useMaskedInput({
 *  value,
 *  formatter,
 *  onChange: setValue,
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
  const rerender = useRerender()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = evt.target.value

    valueRef.current = {
      eventValue,
      input: evt.target,
      hasSizeIncrease: eventValue.length > userValue.length,
      pressedDelete: isDeleteKeyPressed(),
      hasNoChanges: userValue === formatter(eventValue),
    }

    rerender()
  }

  useSafeLayoutEffect(() => {
    if (valueRef.current == null) return

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

    // adjust the cursor based on the formatted value
    const getCursorPosition = (val: string) => {
      let start = 0
      let cleanPos = 0

      for (let i = 0; i !== valueBeforeSelectionStart.length; ++i) {
        let newPos = val.indexOf(valueBeforeSelectionStart[i], start) + 1

        let newCleanPos =
          clean(val, accept).indexOf(valueBeforeSelectionStart[i], cleanPos) + 1

        if (newCleanPos - cleanPos > 1) {
          newPos = start
          newCleanPos = cleanPos
        }

        cleanPos = Math.max(newCleanPos, cleanPos)
        start = Math.max(start, newPos)
      }

      return start
    }

    const formattedValue = formatter(eventValue)

    if (userValue === formattedValue) {
      rerender()
    } else {
      onChange(formattedValue)
    }

    return () => {
      let start = getCursorPosition(formattedValue)

      if (hasSizeIncrease || (pressedDelete && !deleteCausesNoChanges)) {
        while (
          formattedValue[start] &&
          clean(formattedValue[start], accept) === ''
        ) {
          start += 1
        }
      }

      input.selectionEnd =
        start + (deleteCausesNoChanges ? 1 + charsToSkipAfterDelete : 0)
      input.selectionStart =
        start + (deleteCausesNoChanges ? 1 + charsToSkipAfterDelete : 0)
    }
  })

  return {
    value: valueRef.current !== null ? valueRef.current.eventValue : userValue,
    onChange: handleChange,
  }
}

/**
 * Create string from only accepted symbols
 */
function clean(str: string, accept: RegExp) {
  return (str.match(accept) || []).join('')
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
