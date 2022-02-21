import { runIfFunction } from '@vtex/admin-ui-util'
import type { SetStateAction, Dispatch } from 'react'
import { useState, useCallback } from 'react'

import { useCallbackRef } from './useCallbackRef'

/**
 * Create a state that is both controlled or uncontrolled
 */
export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next,
  } = props

  const onChangeProp = useCallbackRef(onChange)
  const shouldUpdateProp = useCallbackRef(shouldUpdate)

  const [valueState, setValue] = useState(defaultValue as T)

  const isControlled = valueProp !== undefined
  const value = isControlled ? (valueProp as T) : valueState

  const updateValue = useCallback(
    (next: SetStateAction<T>) => {
      const nextValue = runIfFunction(next, value)

      if (!shouldUpdateProp(value, nextValue)) {
        return
      }

      if (!isControlled) {
        setValue(nextValue)
      }

      onChangeProp(nextValue)
    },
    [isControlled, onChangeProp, value, shouldUpdateProp]
  )

  return [value, updateValue] as [T, Dispatch<SetStateAction<T>>]
}

export interface UseControllableStateProps<T> {
  /**
   * The value to used in controlled mode
   */
  value?: T
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue?: T | (() => T)
  /**
   * The callback fired when the value changes
   */
  onChange?: (value: T) => void
  /**
   * The function that determines if the state should be updated
   */
  shouldUpdate?: (prev: T, next: T) => boolean
}
