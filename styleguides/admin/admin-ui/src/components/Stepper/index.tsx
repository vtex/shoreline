import React, { useState } from 'react'
import { Box } from '../Box'
import { IconMinus, IconPlus } from '../../icons'
import { cn } from '../../system'
import { Input } from 'reakit'

const normalizeMin = (min: number | null) => (min == null ? -Infinity : min)
const normalizeMax = (max: number | undefined) =>
  max == undefined ? Infinity : max

const validateValue = (value: number, min: number, max: number | undefined) => {
  min = normalizeMin(min)
  max = normalizeMax(max)

  if (value < min) {
    return min
  } else if (value > max) {
    return max
  }
  return value
}

export function Stepper(props: StepperProps) {
  const {
    value: initialValue,
    minValue,
    maxValue,
    disable,
    unitMultiplier,
    onChange: onChangeInputed,
    errorMessage,
    helperText,
    error,
  } = props
  const [value, setValue] = useState(initialValue)
  const minimum = minValue ?? 0
  const multiplier = unitMultiplier ?? 1
  const isMinusDisabled = () => {
    return disable ? true : value === minimum ? true : false
  }
  const isPlusDisabled = () => {
    return disable ? true : maxValue && value === maxValue ? true : false
  }

  const changeValue = (value: number) => {
    const parsedValue = validateValue(value, minimum, maxValue)
    setValue(parsedValue)
    if (onChangeInputed) {
      onChangeInputed(parsedValue.toString())
    }
  }

  const changeInputValue = (value: string) => {
    setValue(Number(value))
    if (onChangeInputed) {
      onChangeInputed(value)
    }
  }

  const handleIncreaseValue = () => {
    const newValue =
      maxValue && value + multiplier > maxValue ? maxValue : value + multiplier
    changeValue(newValue)
  }

  const handleDecreaseValue = () => {
    const newValue =
      value - multiplier >= minimum ? value - multiplier : minimum
    changeValue(newValue)
  }

  return (
    <>
      <Box
        themeKey={`components.stepper${
          error ? '.error' : disable ? '.disable' : '.usual'
        }`}
      >
        <IconMinus
          style={{
            color: isMinusDisabled() ? '#898F9E' : '#2953B2',
            paddingRight: 4,
          }}
          onClick={handleDecreaseValue}
        />

        <Input
          value={value}
          type="number"
          min={minimum}
          max={maxValue}
          onChange={(e) => changeInputValue(e.target.value)}
          disabled={disable}
          aria-label="input"
          className={cn({
            fontSize: 14,
            appearance: 'none',
            '::-webkit-inner-spin-button ': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            textAlign: 'center',
            width: 34,
            height: 45,
            color: disable ? '#898F9E' : 'basic.black',
            backgroundColor: disable ? 'muted.4' : 'primary.contrast',
            ':focus': {
              outline: 'none',
            },
          })}
        />

        <IconPlus
          style={{
            color: isPlusDisabled() ? '#898F9E' : '#2953B2',
            paddingLeft: 4,
          }}
          onClick={handleIncreaseValue}
        />
      </Box>
      {errorMessage && (
        <Box text="small" styles={{ color: 'danger.base', marginTop: 2 }}>
          {errorMessage}
        </Box>
      )}

      {helperText && (
        <Box text="small" styles={{ color: '#898F9E', marginTop: 2 }}>
          {helperText}
        </Box>
      )}
    </>
  )
}

export interface StepperProps {
  value: number
  minValue?: number
  maxValue?: number
  disable?: boolean
  error?: boolean
  onChange?: (value: string) => void
  errorMessage?: string
  helperText?: string
  unitMultiplier?: number
}
