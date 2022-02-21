import { useState, useCallback, useMemo } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { CompositeItem } from 'reakit'
import { callAllHandlers, dataAttr } from '@vtex/admin-ui-util'
import { useSpinButton } from '@react-aria/spinbutton'
import { mergeProps } from '@react-aria/utils'

import { useDateFormatter } from '../i18n'
import { isNumeric, parseNumber } from './util'
import type { DateSegmentProps, SegmentStateReturn } from './date-field-state'

export const DateFieldSegment = createComponent<
  typeof CompositeItem,
  DateSegmentOptions
>((props) => {
  const {
    isDisabled,
    isReadOnly,
    isRequired,
    segment,
    state,
    onMouseDown: htmlOnMouseDown,
    onKeyDown: htmlOnKeyDown,
    onFocus: htmlOnFocus,
    ...htmlProps
  } = props

  const {
    next,
    dateFormatter,
    increment,
    decrement,
    incrementPage,
    decrementPage,
    setSegment,
    confirmPlaceholder,
  } = state

  const disabled = isDisabled || isReadOnly || segment.type === 'literal'

  const [enteredKeys, setEnteredKeys] = useState('')
  const monthFormatter = useDateFormatter({ month: 'long' })
  const hourFormatter = useDateFormatter({
    hour: 'numeric',
    hour12: dateFormatter.resolvedOptions().hour12,
  })

  const { spinButtonProps } = useSpinButton({
    value: segment.value,
    textValue: getTextValue(segment, state, {
      month: monthFormatter,
      hour: hourFormatter,
    }),
    minValue: segment.minValue,
    maxValue: segment.maxValue,
    isDisabled,
    isReadOnly,
    isRequired,
    onIncrement: () => increment(segment.type),
    onDecrement: () => decrement(segment.type),
    onIncrementPage: () => incrementPage(segment.type),
    onDecrementPage: () => decrementPage(segment.type),
    onIncrementToMax: () =>
      setSegment(segment.type, segment.maxValue as number),
    onDecrementToMin: () =>
      setSegment(segment.type, segment.minValue as number),
  })

  const onInput = useCallback(
    (key: string) =>
      getInput({
        key,
        enteredKeys,
        setEnteredKeys,
        state,
        segment,
      }),
    [enteredKeys, next, segment.maxValue, segment.type]
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return
      }

      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          if (segment.isPlaceholder && !isReadOnly) {
            confirmPlaceholder(segment.type)
          }

          next()
          break

        case 'Tab':
          break

        case 'Backspace': {
          e.preventDefault()
          if (isNumeric(segment.text) && !isReadOnly) {
            const newValue = segment.text.slice(0, -1)

            setSegment(
              segment.type,
              newValue.length === 0
                ? (segment.minValue as number)
                : parseNumber(newValue)
            )
            setEnteredKeys(newValue)
          }

          break
        }

        default:
          e.preventDefault()
          e.stopPropagation()
          if ((isNumeric(e.key) || /^[ap]$/.test(e.key)) && !isReadOnly) {
            onInput(e.key)
          }
      }
    },
    [
      next,
      onInput,
      segment.isPlaceholder,
      segment.minValue,
      segment.text,
      segment.type,
    ]
  )

  const onFocus = useCallback(() => {
    setEnteredKeys('')
  }, [])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  )

  const elementProps = useMemo(() => {
    switch (segment.type) {
      case 'literal':
        return {
          state,
          'data-placeholder': dataAttr(false),
          children: segment.text,
          tabIndex: disabled ? -1 : 0,
          disabled,
          ...htmlProps,
        }

      case 'era':
        return {
          state,
          'data-placeholder': true,
          children: segment.text,
          tabIndex: disabled ? -1 : 0,
          disabled,
          ...htmlProps,
        }

      default:
        return mergeProps(spinButtonProps, {
          state,
          'aria-label': segment.type,
          onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
          onFocus: callAllHandlers(htmlOnFocus, onFocus),
          onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
          children: segment.text,
          tabIndex: props ? -1 : 0,
          disabled,
          ...htmlProps,
        })
    }
  }, [segment, state, disabled])

  return useElement(CompositeItem, {
    baseStyle: {
      cursor: 'pointer',
      text: 'body',
      bg: '$action.neutral.tertiary',
      color: '$action.neutral.tertiaryPressed',
      borderRadius: 2,
      ':hover': {
        bg: '$action.neutral.tertiaryHover',
        color: '$action.neutral.tertiaryPressed',
      },
      ':active': {
        bg: '$action.neutral.tertiaryPressed',
        color: '$action.neutral.tertiaryPressed',
      },
      ':focus': {
        bg: '$inverted',
        color: '$inverted',
        outline: 'none',
      },
    },
    ...(elementProps as any),
  })
})

function getTextValue(
  segment: DateSegmentProps,
  state: SegmentStateReturn,
  formatters: {
    hour: ReturnType<typeof useDateFormatter>
    month: ReturnType<typeof useDateFormatter>
  }
) {
  switch (segment.type) {
    case 'month': {
      return formatters.month.format(state.fieldValue)
    }

    case 'hour': {
      const hourFormattedValue = formatters.hour.format(state.fieldValue)

      return hourFormattedValue.split(' ')[0]
    }

    case 'dayPeriod': {
      const hourFormattedValue = formatters.hour.format(state.fieldValue)

      return hourFormattedValue.split(' ')[1]
    }

    default: {
      return segment.text
    }
  }
}

function getInput(props: {
  key: string
  enteredKeys: string
  setEnteredKeys: (s: string) => void
  segment: DateSegmentProps
  state: SegmentStateReturn
}) {
  const { key, enteredKeys, setEnteredKeys, segment, state } = props
  const newValue = enteredKeys + key

  switch (segment.type) {
    case 'dayPeriod':
      if (key === 'a') {
        state.setSegment('dayPeriod', 0)
      } else if (key === 'p') {
        state.setSegment('dayPeriod', 12)
      }

      state.next()
      break

    case 'day':

    case 'hour':

    case 'minute':

    case 'second':

    case 'month':

    case 'year': {
      if (!isNumeric(newValue)) {
        return
      }

      const numberValue = parseNumber(newValue)
      let segmentValue = numberValue

      if (
        segment.type === 'hour' &&
        state.dateFormatter.resolvedOptions().hour12 &&
        numberValue === 12
      ) {
        segmentValue = 0
      } else if (numberValue > (segment.maxValue as number)) {
        segmentValue = parseNumber(key)
      }

      state.setSegment(segment.type, segmentValue)

      if (Number(`${numberValue}0`) > (segment.maxValue as number)) {
        setEnteredKeys('')
        state.next()
      } else {
        setEnteredKeys(newValue)
      }

      break
    }
  }
}

export type DateSegmentOptions = {
  state: SegmentStateReturn
  segment: DateSegmentProps
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
}
