import type { Ref } from 'react'
import React, { forwardRef, useEffect, useReducer } from 'react'
import { Input as ReakitInput } from 'reakit'
import { IconPlus, IconMinus } from '@vtex/phosphor-icons'
import { focusVisible } from '@vtex/admin-ui-core'
import { useSystem } from '@vtex/admin-ui-react'

import invariant from 'tiny-invariant'

import { Box } from '../Box'
import type { SystemComponentProps } from '../../types'
import { Button } from '../Button'
import type { AbstractInputOwnProps } from '../AbstractInput'
import { Text } from '../Text'

export const NumericStepper = forwardRef(
  (props: NumericStepperProps, ref: Ref<HTMLDivElement>) => {
    const {
      value,
      minValue = -10e9,
      maxValue = 10e9,
      disabled,
      step = 1,
      onChange,
      tone = 'neutral',
      helperText,
      criticalText,
      label,
      csx,
      ...inputProps
    } = props

    const { cn } = useSystem()
    const initialState = { value }

    const [state, dispatch] = useReducer(reducer, initialState)

    const hasHelper = tone === 'critical' || !!helperText

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'change',
        value: Number(event.target.value),
        onChange,
        minValue,
        maxValue,
      })

    const handleIncrement = () =>
      dispatch({
        type: 'increment',
        maxValue,
        onChange,
        step,
      })

    const handleDecrement = () =>
      dispatch({
        type: 'decrement',
        minValue,
        onChange,
        step,
      })

    useEffect(() => {
      if (state.value !== value) {
        dispatch({
          type: 'change',
          value,
          onChange,
          minValue,
          maxValue,
        })
      }
    }, [value])

    return (
      <Box csx={{ width: 106 }} ref={ref}>
        <Box
          csx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: 48,
            width: 106,
            paddingY: 12,
          }}
        >
          <ReakitInput
            value={state.value}
            type="number"
            min={minValue}
            max={maxValue}
            onChange={(event) => handleChange(event)}
            disabled={disabled}
            aria-label={label}
            className={cn({
              width: 106,
              height: 48,
              appearance: 'none',
              '::-webkit-inner-spin-button ': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              paddingLeft: 36,
              paddingRight: 36,
              textAlign: 'center',
              color: '$form.neutral',
              border: '$form.neutral',
              borderRadius: '$default',
              bg: '$form.neutral',
              ':hover': {
                border: '$form.neutralHover',
              },
              ':disabled': {
                bg: '$disabled',
                color: '$disabled',
                border: '$disabled',
              },
              ':focus': {
                border: '$form.neutralFocus',
                color: '$form.neutralFocus',
                bg: '$form.neutralFocus',
              },
              ...focusVisible('neutral'),
              ...(tone === 'critical'
                ? {
                    border: '$form.critical',
                    ':hover': {
                      border: '$form.criticalHover',
                    },
                    ...focusVisible('critical'),
                  }
                : {}),
              ...csx,
            })}
            {...inputProps}
          />

          <Button
            size="small"
            variant="tertiary"
            icon={<IconMinus />}
            csx={{
              height: 40,
              position: 'absolute',
              left: 1,
            }}
            aria-label={`${label}-decrease-button`}
            onClick={handleDecrement}
            disabled={disabled ?? state.value === minValue}
          />

          <Button
            size="small"
            variant="tertiary"
            icon={<IconPlus />}
            aria-label={`${label}-increase-button}`}
            csx={{
              height: 40,
              position: 'absolute',
              right: 1,
            }}
            onClick={handleIncrement}
            disabled={disabled ?? state.value === maxValue}
          />
        </Box>
        {hasHelper && (
          <Text
            variant="small"
            tone={tone === 'critical' ? 'critical' : 'secondary'}
            csx={{
              marginTop: 2,
            }}
          >
            {tone === 'critical' ? criticalText : helperText}
          </Text>
        )}
      </Box>
    )
  }
)

function reducer(state: StateValue, action: Action): StateValue {
  switch (action.type) {
    case 'increment': {
      const { step, maxValue, onChange } = action
      const incrementedValue = state.value + step
      const nextValue =
        incrementedValue > maxValue ? maxValue : incrementedValue

      const nextState = { value: nextValue }

      onChange(nextState)

      return nextState
    }

    case 'decrement': {
      const { step, minValue, onChange } = action
      const decrementedValue = state.value - step
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
      step: number
      maxValue: number
      onChange: (value: StateValue) => void
    }
  | {
      type: 'decrement'
      step: number
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

export interface NumericStepperProps
  extends SystemComponentProps<AbstractInputOwnProps> {
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
   * Tone of voice
   * @default neutral
   */
  tone?: 'neutral' | 'critical'
  /**
   * NumericStepper error message
   */
  criticalText?: string
  /**
   * NumericStepper helper Text
   */
  helperText?: string
  /**
   * Increment and Decrement multiplier value
   * @default 1
   */
  step?: number
}
