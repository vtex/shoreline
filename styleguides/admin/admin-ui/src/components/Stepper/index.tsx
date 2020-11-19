import React, { useState } from 'react'
import { Box } from '../Box'
import { IconMinus, IconPlus } from '../../icons'
import { useClassName } from '../../system'
import { Input as ReakitInput } from 'reakit'

const normalizeMin = (min: number | undefined) =>
  min == null ? -Infinity : min
const normalizeMax = (max: number | undefined) =>
  max == undefined ? Infinity : max

const validateValue = (
  value: number,
  min: number | undefined,
  max: number | undefined
) => {
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
    disabled,
    unitMultiplier,
    onChange: onChangeInputed,
    errorMessage,
    helperText,
    error,
    label,
    ...inputProps
  } = props
  const [value, setValue] = useState(initialValue)
  const hasHelper = error || helperText

  const className = useClassName({
    themeKey: `components.stepper${error ? '.error' : '.usual'}`,
  })

  const multiplier = unitMultiplier ?? 1
  const isMinusDisabled = () => {
    return disabled ? true : value === minValue ? true : false
  }
  const isPlusDisabled = () => {
    return disabled ? true : maxValue && value === maxValue ? true : false
  }

  const changeValue = (value: number) => {
    const parsedValue = validateValue(value, minValue, maxValue)
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
      minValue && value - multiplier <= minValue ? minValue : value - multiplier
    changeValue(newValue)
  }

  return (
    <>
      <Box
        styles={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          height: 48,
          width: 106,
          paddingY: 12,
        }}
      >
        <ReakitInput
          {...inputProps}
          value={value}
          type="number"
          min={minValue}
          max={maxValue}
          onChange={(e) => changeInputValue(e.target.value)}
          disabled={disabled}
          aria-label={label}
          className={className}
        />

        <Box
          element="button"
          themeKey="components.stepper.buttonMinus"
          aria-label="Decrease Value"
          onClick={isMinusDisabled() ? undefined : handleDecreaseValue}
        >
          <Box
            styles={{ color: isMinusDisabled() ? 'muted.0' : 'primary.base' }}
          >
            <IconMinus size={20} />
          </Box>
        </Box>

        <Box
          element="button"
          themeKey="components.stepper.buttonPlus"
          aria-label="Increase Value"
          onClick={isPlusDisabled() ? undefined : handleIncreaseValue}
        >
          <Box
            styles={{ color: isPlusDisabled() ? 'muted.0' : 'primary.base' }}
          >
            <IconPlus size={20} />
          </Box>
        </Box>
      </Box>
      {hasHelper && (
        <Box
          text="small"
          styles={{ color: error ? 'danger.base' : 'muted.0', marginTop: 2 }}
        >
          {error ? errorMessage : helperText}
        </Box>
      )}
    </>
  )
}
export interface StepperProps {
  value: number
  minValue?: number
  maxValue?: number
  disabled?: boolean
  error?: boolean
  onChange?: (value: string) => void
  errorMessage?: string
  helperText?: string
  unitMultiplier?: number
  label: string
}
