import React, { ChangeEvent, useState } from 'react'
import { Box } from '../Box'
import {
  IconMinus,
  IconPlus,
  IconPlusDisabled,
  IconMinusDisabled,
} from '../../icons'
import { cn } from '../../system'
import { Input } from 'reakit'

const normalizeMin = (min: number | null) => (min == null ? -Infinity : min)
const normalizeMax = (max: number | undefined) =>
  max == undefined ? Infinity : max

const validateValue = (
  value: any,
  min: number,
  max: number | undefined,
  defaultValue: number
) => {
  min = normalizeMin(min)
  max = normalizeMax(max)

  if (isNaN(value) || value == null || !value) {
    if (defaultValue < min) return min
    if (defaultValue > max) return max
    return defaultValue
  } else if (value < min) {
    return min
  } else if (value > max) {
    return max
  }
  return parseInt(value, 10)
}

export function StepperInside(props: StepperProps) {
  const {
    value: initialValue,
    variant,
    minValue,
    maxValue,
    defaultValue,
    disable,
    unitMultiplier,
    onChange: onChangeInputed,
  } = props
  const [value, setValue] = useState(initialValue)
  const minimum = minValue ?? 0
  const valueDefault = defaultValue ?? 0
  const multiplier = unitMultiplier ?? 1
  const isMinusDisabled = () => {
    return disable ? true : value === minimum ? true : false
  }
  const isPlusDisabled = () => {
    return disable ? true : maxValue && value === maxValue ? true : false
  }
  const borderStyle =
    variant === 'hover' ? 'strong' : variant === 'danger' ? 'danger' : 'default'

  const changeValue = (value: any) => {
    const parsedValue = validateValue(value, minimum, maxValue, valueDefault)
    setValue(parsedValue)
    if (onChangeInputed) {
      onChangeInputed(parsedValue)
    }
  }

  const handleTypeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    changeValue(event.target.value)
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
    <Box
      border={borderStyle}
      themeKey={
        disable ? 'components.stepper.disable' : 'components.stepper.usual'
      }
    >
      {isMinusDisabled() ? (
        <IconMinusDisabled style={{ paddingRight: 4 }} />
      ) : (
        <IconMinus style={{ paddingRight: 4 }} onClick={handleDecreaseValue} />
      )}

      <Input
        value={value}
        type="tel"
        aria-label="input"
        onChange={handleTypeQuantity}
        disabled={disable}
        className={cn({
          fontSize: 14,
          textAlign: 'center',
          width: 34,
          height: 45,
          backgroundColor: disable ? 'muted.4' : 'primary.contrast',
        })}
      />
      {isPlusDisabled() ? (
        <IconPlusDisabled style={{ paddingLeft: 4 }} />
      ) : (
        <IconPlus style={{ paddingLeft: 4 }} onClick={handleIncreaseValue} />
      )}
    </Box>
  )
}

export function Stepper(props: StepperProps) {
  const { errorMessage, helperText, variant } = props

  return (
    <>
      {variant === 'focus' ? (
        <Box
          border={'default'}
          styles={{
            borderWidth: 2,
            padding: 0.8,
            borderColor: '#8DB6FA',
            width: 112,
            alignItems: 'center',
            height: 54,
          }}
        >
          <StepperInside {...props}></StepperInside>
        </Box>
      ) : (
        <StepperInside {...props}></StepperInside>
      )}
      {errorMessage && (
        <Box
          text="body"
          styles={{ color: 'danger.base', fontSize: 12, marginTop: 2 }}
        >
          {errorMessage}
        </Box>
      )}

      {helperText && (
        <Box
          text="body"
          styles={{ color: 'muted.1', fontSize: 12, marginTop: 2 }}
        >
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
  variant?: 'hover' | 'danger' | 'focus'
  disable?: boolean
  onChange?: (value: number) => void
  errorMessage?: string
  helperText?: string
  defaultValue?: number
  unitMultiplier?: number
}
