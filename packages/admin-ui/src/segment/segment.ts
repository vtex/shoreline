import { useState, useCallback, useMemo } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { CompositeItem, unstable_useId as useId } from 'reakit'
import { callAllHandlers } from '@vtex/admin-ui-util'
import { useSpinButton } from '@react-aria/spinbutton'
import { mergeProps } from '@react-aria/utils'

import { useDateFormatter } from '../i18n'
import { isNumeric, parseNumber } from './util'
import type { DateSegment, SegmentStateReturn } from './segment.state'
import * as style from './segment.style'

export const Segment = createComponent<typeof CompositeItem, SegmentOptions>(
  (props) => {
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
    } = state

    const disabled = useMemo(
      () => isDisabled || isReadOnly || segment.type === 'literal',
      [isDisabled, isReadOnly, segment.type]
    )

    const { id } = useId({ baseId: 'datepicker-segment' })
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

    const onNumericKeyDown = useCallback(
      (key: string) => {
        const newValue = enteredKeys + key

        if (segment.type === 'dayPeriod') {
          if (key === 'a') {
            state.setSegment('dayPeriod', 0)
          } else if (key === 'p') {
            state.setSegment('dayPeriod', 12)
          }

          state.next()
        } else {
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
        }
      },
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
              // TODO: fix typing experience
              // onNumericKeyDown(e.key)
            }
        }
      },
      [next, onNumericKeyDown, segment.minValue, segment.text, segment.type]
    )

    const onFocus = useCallback(() => {
      setEnteredKeys('')
    }, [])

    const onMouseDown = useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      []
    )

    const elementProps = useMemo(() => {
      const baseProps = {
        state,
        disabled,
        tabIndex: disabled ? -1 : 0,
        children: segment.text,
        ...htmlProps,
      }

      switch (segment.type) {
        case 'literal':
          return {
            ...baseProps,
            baseStyle: {
              ...style.segment,
              ...style.segmentVariants({
                literal: true,
              }),
            },
          }

        case 'era':
          return {
            ...baseProps,
            baseStyle: {
              ...style.segment,
              ...style.segmentVariants({
                literal: false,
              }),
            },
          }

        default:
          return mergeProps(spinButtonProps, {
            ...baseProps,
            'aria-label': segment.type,
            onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
            onFocus: callAllHandlers(htmlOnFocus, onFocus),
            onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
            children: getTextValue(segment, state, {
              month: monthFormatter,
              hour: hourFormatter,
            }),
            baseStyle: {
              ...style.segment,
              ...style.segmentVariants({
                literal: false,
              }),
            },
          })
      }
    }, [segment, state, disabled])

    return useElement(CompositeItem, {
      ...elementProps,
      id,
      'aria-labelledby': id,
    })
  }
)

function getTextValue(
  segment: DateSegment,
  state: SegmentStateReturn,
  formatters: {
    hour: ReturnType<typeof useDateFormatter>
    month: ReturnType<typeof useDateFormatter>
  }
) {
  switch (segment.type) {
    case 'hour': {
      const hourFormattedValue = formatters.hour.format(state.fieldValue)

      return hourFormattedValue.split(' ')[0]
    }

    case 'dayPeriod': {
      const hourFormattedValue = formatters.hour.format(state.fieldValue)

      return hourFormattedValue.split(' ')[1]
    }

    default: {
      const displayPlaceholder =
        state.showPlaceholder.current[segment.type] ?? false

      return displayPlaceholder ? segment.placeholder : segment.text
    }
  }
}

export interface SegmentOptions {
  state: SegmentStateReturn
  segment: DateSegment
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
}
