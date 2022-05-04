import React from 'react'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

interface Args {
  value: string
  onChange: (str: string) => void
  format: (str: string) => string
  mask?: boolean
  accept?: RegExp
}

interface RenderArgs {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

interface ValueRef {
  eventValue: string
  input: EventTarget & HTMLInputElement
  isSizeIncreaseOperation: boolean
  isDeleleteButtonDown: boolean
  isNoOperation: boolean
}

export function useInput(props: Args): RenderArgs {
  const [, refresh] = React.useReducer((c) => Number(c) + 1, 0)
  const valueRef = React.useRef<ValueRef | null>(null)
  const userValue = props.format(props.value)

  // state of delete button see comments below about inputType support
  const isDeleleteButtonDownRef = React.useRef(false)

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = evt.target.value

    valueRef.current = {
      eventValue, // eventValue
      input: evt.target, // input
      isSizeIncreaseOperation: eventValue.length > userValue.length, // isSizeIncreaseOperation
      isDeleleteButtonDown: isDeleleteButtonDownRef.current, // isDeleleteButtonDown
      isNoOperation: userValue === props.format(eventValue), // isNoOperation
    }

    // The main trick is to update underlying input with non formatted value (= eventValue)
    // that allows us to calculate right cursor position after formatting (see getCursorPosition)
    // then we format new value and call props.onChange with masked/formatted value
    // and finally we are able to set cursor position into right place
    refresh()
  }

  useSafeLayoutEffect(() => {
    if (valueRef.current == null) return

    const {
      eventValue,
      input,
      isSizeIncreaseOperation,
      isDeleleteButtonDown,
      // No operation means that value itself hasn't been changed, BTW cursor, selection etc can be changed
      isNoOperation,
    } = valueRef.current

    valueRef.current = null

    // this usually occurs on deleting special symbols like ' here 123'123.00
    // in case of isDeleleteButtonDown cursor should move differently vs backspace
    const deleteWasNoOp = isDeleleteButtonDown && isNoOperation

    const valueAfterSelectionStart = eventValue.slice(
      input?.selectionStart ?? undefined
    )

    const acceptedCharIndexAfterDelete = valueAfterSelectionStart.search(
      props.accept || /\d/g
    )

    const charsToSkipAfterDelete =
      acceptedCharIndexAfterDelete !== -1 ? acceptedCharIndexAfterDelete : 0

    // Create string from only accepted symbols
    const clean = (str: string) =>
      (str.match(props.accept || /\d/g) || []).join('')

    const valueBeforeSelectionStart = clean(
      eventValue.substring(0, input?.selectionStart ?? undefined)
    )

    // trying to find cursor position in formatted value having knowledge about valueBeforeSelectionStart
    // This works because we assume that format doesn't change the order of accepted symbols.
    // Imagine we have formatter which adds ' symbol between numbers, and by default we refuse all non numeric symbols
    // for example we had input = 1'2|'4 (| means cursor position) then user entered '3' symbol
    // inputValue = 1'23'|4 so valueBeforeSelectionStart = 123 and formatted value = 1'2'3'4
    // calling getCursorPosition("1'2'3'4") will give us position after 3, 1'2'3|'4
    // so for formatting just this function to determine cursor position after formatting is enough
    // with masking we need to do some additional checks see `mask` below
    const getCursorPosition = (val: string) => {
      let start = 0
      let cleanPos = 0

      for (let i = 0; i !== valueBeforeSelectionStart.length; ++i) {
        let newPos = val.indexOf(valueBeforeSelectionStart[i], start) + 1

        let newCleanPos =
          clean(val).indexOf(valueBeforeSelectionStart[i], cleanPos) + 1

        // this skips position change if accepted symbols order was broken
        // For example fixes edge case with fixed point numbers:
        // You have '0|.00', then press 1, it becomes 01|.00 and after format 1.00, this breaks our assumption
        // that order of accepted symbols is not changed after format,
        // so here we don't update start position if other accepted symbols was inbetween current and new position
        if (newCleanPos - cleanPos > 1) {
          newPos = start
          newCleanPos = cleanPos
        }

        cleanPos = Math.max(newCleanPos, cleanPos)
        start = Math.max(start, newPos)
      }

      return start
    }

    const formattedValue = props.format(eventValue)

    if (userValue === formattedValue) {
      // if nothing changed for formatted value, just refresh so userValue will be used at render
      refresh()
    } else {
      props.onChange(formattedValue)
    }

    return () => {
      let start = getCursorPosition(formattedValue)

      // Visually improves working with masked values,
      // like cursor jumping over refused symbols
      // as an example date mask: was "5|1-24-3" then user pressed "6"
      // it becomes "56-|12-43" with this code, and "56|-12-43" without
      if (isSizeIncreaseOperation || (isDeleleteButtonDown && !deleteWasNoOp)) {
        while (formattedValue[start] && clean(formattedValue[start]) === '') {
          start += 1
        }
      }

      input.selectionEnd =
        start + (deleteWasNoOp ? 1 + charsToSkipAfterDelete : 0)
      input.selectionStart =
        start + (deleteWasNoOp ? 1 + charsToSkipAfterDelete : 0)
    }
  })

  useSafeLayoutEffect(() => {
    // until https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported
    // by all major browsers (now supported by: +chrome, +safari, ?edge, !firefox)
    // there is no way I found to distinguish in onChange
    // backspace or delete was called in some situations
    // firefox track https://bugzilla.mozilla.org/show_bug.cgi?id=1447239
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        isDeleleteButtonDownRef.current = true
      }
    }

    const handleKeyUp = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        isDeleleteButtonDownRef.current = false
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return {
    value: valueRef.current !== null ? valueRef.current.eventValue : userValue,
    onChange,
  }
}
