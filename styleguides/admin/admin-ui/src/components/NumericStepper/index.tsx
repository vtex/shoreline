import React, { useReducer } from 'react'
import { Input as ReakitInput } from 'reakit'
import { IconAdd, IconRemove } from '@vtex/admin-ui-icons'
import invariant from 'tiny-invariant'

import { Box } from '../Box'
import { useClassName } from '../../system'
import { Overridable } from '../../types'
import { Button } from '../Button'

export function NumericStepper(props: NumericStepperProps) {
  const {
    value,
    minValue = -10e9,
    maxValue = 10e9,
    disabled,
    unitMultiplier = 1,
    onChange,
    errorMessage,
    helperText,
    error,
    label,
    styleOverrides,
    ...inputProps
  } = props

  const initialState = { value }

  const [state, dispatch] = useReducer(reducer, initialState)

  const hasHelper = error ?? helperText

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `components.numericStepper${error ? '.error' : '.default'}`,
  })

  return (
    <Box styles={{ width: 106 }}>
      <Box themeKey="components.numericStepper.container">
        <ReakitInput
          value={state.value}
          type="number"
          min={minValue}
          max={maxValue}
          onChange={(event) =>
            dispatch({
              type: 'change',
              value: Number(event.target.value),
              onChange,
              minValue,
              maxValue,
            })
          }
          disabled={disabled}
          aria-label={label}
          className={className}
          {...inputProps}
        />

        <Button
          size="small"
          variant="tertiary"
          icon={<IconRemove />}
          styleOverrides={{ position: 'absolute', left: 1 }}
          aria-label={`${label}-decrease-button`}
          onClick={() =>
            dispatch({
              type: 'decrement',
              minValue,
              onChange,
              unitMultiplier,
            })
          }
          disabled={disabled ?? state.value === minValue}
        />

        <Button
          size="small"
          variant="tertiary"
          icon={<IconAdd />}
          aria-label={`${label}-increase-button}`}
          styleOverrides={{ position: 'absolute', right: 1 }}
          onClick={() =>
            dispatch({
              type: 'increment',
              maxValue,
              onChange,
              unitMultiplier,
            })
          }
          disabled={disabled ?? state.value === maxValue}
        />
      </Box>
      {hasHelper && (
        <Box
          text="small"
          styles={{ color: error ? 'danger.base' : 'muted.0', marginTop: 2 }}
        >
          {error ? errorMessage : helperText}
        </Box>
      )}
    </Box>
  )
}

function reducer(state: StateValue, action: Action): StateValue {
  switch (action.type) {
    case 'increment': {
      const { unitMultiplier, maxValue, onChange } = action
      const incrementedValue = state.value + unitMultiplier
      const nextValue =
        incrementedValue > maxValue ? maxValue : incrementedValue

      const nextState = { value: nextValue }

      onChange(nextState)

      return nextState
    }

    case 'decrement': {
      const { unitMultiplier, minValue, onChange } = action
      const decrementedValue = state.value - unitMultiplier
      const nextValue =
        decrementedValue < minValue ? minValue : decrementedValue

      const nextState = { value: nextValue }

      onChange(nextState)

      return nextState
    }

    case 'change': {
      const { value, minValue, maxValue, onChange } = action

      const hasMaxLimit = value > maxValue
      const hasMinLimit = value < minValue
      const nextValue = hasMaxLimit ? maxValue : hasMinLimit ? minValue : value

      const nextState = { value: nextValue }

      onChange(nextState)

      return nextState
    }

    default:
      invariant(
        action,
        `NumericStepper reducer action not defined. Received action: ${action}`
      )

      return state
  }
}

interface StateValue {
  value: number
}

type Action =
  | {
      type: 'increment'
      unitMultiplier: number
      maxValue: number
      onChange: (value: StateValue) => void
    }
  | {
      type: 'decrement'
      unitMultiplier: number
      minValue: number
      onChange: (value: StateValue) => void
    }
  | {
      type: 'change'
      value: number
      maxValue: number
      minValue: number
      onChange: (value: StateValue) => void
    }

export interface NumericStepperProps extends Overridable {
  /** NumericStepper value */
  value: number
  /**
   * on value change event. Has a StateValue object as parameter.
   *
   * @example
   * ```ts
   * interface StateValue {
   *   value: number
   * }
   * ```
   */
  onChange: (value: StateValue) => void
  /**
   * Represents the aria-label and will be visually hidden.
   */
  label: string
  /**
   * Minimum value limit
   * @default -10e9
   */
  minValue?: number
  /**
   * Maximum value limit
   * @default 10e9
   */
  maxValue?: number
  /**
   * Whether is disabled or not
   * @default false
   */
  disabled?: boolean
  /**
   * Whether has an error or not
   * @default false
   */
  error?: boolean
  /**
   * NumericStepper error message
   */
  errorMessage?: string
  /**
   * NumericStepper helper Text
   */
  helperText?: string
  /**
   * Increment and Decrement multiplier value
   * @default 1
   */
  unitMultiplier?: number
}
