import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import { useMemo, useRef } from 'react'
import { useToggleState } from '@react-stately/toggle'
import { useCheckbox } from '@react-aria/checkbox'
import { useFocusRing } from '@react-aria/focus'
import type { AnyObject } from '@vtex/shoreline-utils'
import { mergeProps } from '@vtex/shoreline-utils'

import { useId } from './use-id'

export function useAriaCheckbox(props: AriaCheckboxProps): AriaCheckbox {
  const {
    id: defaultId,
    indeterminate = false,
    disabled,
    checked,
    defaultChecked,
    required,
    onFocus,
    onBlur,
    label,
    ...rest
  } = props

  const unsafe: AnyObject = {
    onFocus,
    onBlur,
  }

  const { isFocusVisible, focusProps } = useFocusRing()
  const id = useId(defaultId)
  const inputRef = useRef<HTMLInputElement>(null)

  const state = useToggleState({
    isSelected: checked,
    defaultSelected: defaultChecked,
    isDisabled: disabled,
    isRequired: required,
    ...unsafe,
    ...rest,
  })

  const { inputProps } = useCheckbox(
    {
      id,
      isIndeterminate: indeterminate,
      isDisabled: disabled,
      'aria-label': String(label),
      ...unsafe,
      ...rest,
    },
    state,
    inputRef
  )

  const isChecked = useMemo(
    () => state.isSelected && !indeterminate,
    [state.isSelected, indeterminate]
  )

  return {
    inputRef,
    isChecked,
    isFocusVisible,
    labelProps: {
      htmlFor: inputProps.id,
      children: label,
    },
    isIndeterminate: indeterminate,
    isDisabled: inputProps.disabled ?? false,
    inputProps: mergeProps(inputProps, focusProps),
  }
}

type InputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'onChange' | 'value' | 'children'
>

export interface AriaCheckbox {
  inputRef: Ref<HTMLInputElement>
  isChecked: boolean
  isFocusVisible: boolean
  labelProps: {
    htmlFor?: string
    children?: ReactNode
  }
  isIndeterminate: boolean
  isDisabled: boolean
  inputProps: ComponentPropsWithoutRef<'input'>
}

export interface AriaCheckboxProps extends InputProps {
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  value?: string
  label?: ReactNode
}
