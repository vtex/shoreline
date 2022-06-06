import { useEffect, useState } from 'react'
import type { ButtonProps } from '../button'
import {
  isNumber,
  isNumberAsString,
  getIncrementedValue,
  getDecrementedValue,
} from './utils'

import { useMessageFormatter } from '../i18n'

import { messages } from './number-input.i18n'

export const useNumberInput = (props: NumberInputState) => {
  const { initialValue, step, min, max, onChange } = props
  const [currentValue, setCurrentValue] = useState(initialValue)

  const formatMessage = useMessageFormatter(messages.formControl)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    const newValue = isNumberAsString(value) ? Number(value) : value

    setCurrentValue(newValue)
    onChange(newValue)
  }

  const handleIncrement: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isNumber(currentValue)) {
      const newValue = getIncrementedValue({
        currentValue,
        nextValue: currentValue + step,
        min,
        max,
      })

      setCurrentValue(newValue)
      onChange(newValue)
    } else {
      // When the currentValue is a empty string and you click to increment
      const newValue = Math.min(max, step)

      setCurrentValue(newValue)
      onChange(newValue)
    }
  }

  const handleDecrement: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isNumber(currentValue)) {
      const newValue = getDecrementedValue({
        currentValue,
        nextValue: currentValue - step,
        min,
        max,
      })

      setCurrentValue(newValue)
      onChange(newValue)
    } else {
      // When the currentValue is a empty string and you click to decrement
      const newValue = Math.max(min, -step)

      setCurrentValue(newValue)
      onChange(newValue)
    }
  }

  const getInputProps = (props: React.ComponentPropsWithoutRef<'input'>) => {
    return {
      type: 'number',
      value: currentValue,
      step,
      min,
      max,
      onChange: handleChange,
      ...props,
    }
  }

  const getDecrementButtonProps = (props: ButtonProps) => {
    return {
      'aria-label': formatMessage('decrement'),
      variant: 'tertiary',
      onClick: handleDecrement,
      disabled: isNumber(currentValue) && Number(currentValue) <= min,
      ...props,
    }
  }

  const getIncrementButtonProps = (props: ButtonProps) => {
    return {
      'aria-label': formatMessage('increment'),
      variant: 'tertiary',
      onClick: handleIncrement,
      disabled: isNumber(currentValue) && Number(currentValue) >= max,
      ...props,
    }
  }

  useEffect(() => {
    setCurrentValue(initialValue)
  }, [initialValue])

  return {
    getInputProps,
    getDecrementButtonProps,
    getIncrementButtonProps,
  }
}

export type NumberInputValue = number | string

export type NumberInputState = {
  initialValue: NumberInputValue
  step: number
  min: number
  max: number
  onChange: (value: NumberInputValue) => void
}

export type NumberInputStateReturn = ReturnType<typeof useNumberInput>
