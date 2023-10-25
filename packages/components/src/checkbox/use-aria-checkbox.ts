import type { ComponentPropsWithoutRef, Ref } from 'react'
import { useMemo, useRef } from 'react'
import { useToggleState } from '@react-stately/toggle'
import { useCheckbox } from '@react-aria/checkbox'
import { useFocusRing } from '@react-aria/focus'
import type { AnyObject } from '@vtex/shoreline-utils'
import { mergeProps, useId } from '@vtex/shoreline-utils'

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
    onChange,
    ...rest
  } = props

  const typeUnsafe: AnyObject = {
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
    onChange: (checked) =>
      onChange?.({
        target: {
          value: checked,
          checked,
        },
      } as any),
    ...typeUnsafe,
    ...rest,
  })

  const { inputProps } = useCheckbox(
    {
      id,
      isIndeterminate: indeterminate,
      isDisabled: disabled,
      ...typeUnsafe,
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
    isIndeterminate: indeterminate,
    isDisabled: inputProps.disabled ?? false,
    inputProps: mergeProps(inputProps, focusProps),
  }
}

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'value'>

export interface AriaCheckbox {
  inputRef: Ref<HTMLInputElement>
  isChecked: boolean
  isFocusVisible: boolean
  isIndeterminate: boolean
  isDisabled: boolean
  inputProps: ComponentPropsWithoutRef<'input'>
}

export interface AriaCheckboxProps extends InputProps {
  indeterminate?: boolean
  value?: string
}
