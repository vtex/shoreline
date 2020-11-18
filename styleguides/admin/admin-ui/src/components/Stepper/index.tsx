import React, { useState } from 'react'
import { Box } from '../Box'
import { IconMinus, IconPlus } from '../../icons'
import { useClassName } from '../../system'
import { Input } from 'reakit'
import { Button } from '../Button'

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
    disable,
    unitMultiplier,
    onChange: onChangeInputed,
    errorMessage,
    helperText,
    error,
    label,
  } = props
  const [value, setValue] = useState(initialValue)

  const className = useClassName({
    themeKey: `components.stepper${
      error ? '.error' : disable ? '.disable' : '.usual'
    }`,
  })

  const multiplier = unitMultiplier ?? 1
  const isMinusDisabled = () => {
    return disable ? true : value === minValue ? true : false
  }
  const isPlusDisabled = () => {
    return disable ? true : maxValue && value === maxValue ? true : false
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
          paddingY: 14,
        }}
      >
        <Input
          value={value}
          type="number"
          min={minValue}
          max={maxValue}
          onChange={(e) => changeInputValue(e.target.value)}
          disabled={disable}
          aria-label={label}
          className={className}
        />
        <Button
          icon={<IconMinus title="Icon only" />}
          variant="tertiary"
          size="small"
          aria-label="Decrease Value"
          disabled={isMinusDisabled()}
          onClick={handleDecreaseValue}
          styleOverrides={{
            position: 'absolute',
            top: 14,
            left: 12,
            width: 20,
            height: 20,
          }}
        />

        <Button
          icon={<IconPlus title="Icon only" />}
          variant="tertiary"
          disabled={isPlusDisabled()}
          size="small"
          aria-label="Increase Value"
          onClick={handleIncreaseValue}
          styleOverrides={{
            position: 'absolute',
            width: 20,
            height: 20,
            top: 14,
            right: 12,
          }}
        />
      </Box>
      <Box
        text="small"
        styles={{ color: error ? 'danger.base' : '#898F9E', marginTop: 2 }}
      >
        {error ? errorMessage : helperText}
      </Box>
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
  label: string
}
