import React, { forwardRef, useMemo, useRef } from 'react'
import { useMergeRef, mergeProps, useId } from '@vtex/shoreline-utils'
import { IconCheckSmall, IconMinusSmall } from '@vtex/shoreline-icons'
import { VisuallyHidden } from '@vtex/shoreline-primitives'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import { useToggleState } from '@react-stately/toggle'
import { useCheckbox as useReactAriaCheckbox } from '@react-aria/checkbox'
import { useFocusRing } from '@react-aria/focus'
import type { AnyObject } from '@vtex/shoreline-utils'

import { Text } from '../text'

/**
 * Checkbox controls allow users to make multiple independent choices in a form where there are at most five options and each option is binary.
 * @example
 * <Checkbox>Label</Checkbox>
 */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const {
      inputProps,
      inputRef,
      isChecked,
      isIndeterminate,
      isFocusVisible,
      isDisabled,
    } = useCheckbox(props)

    return (
      <label data-sl-checkbox>
        <VisuallyHidden>
          <input
            {...inputProps}
            type="checkbox"
            ref={useMergeRef(inputRef, forwardedRef)}
          />
        </VisuallyHidden>
        <div
          data-sl-checkbox-input
          data-checked={isChecked}
          data-indeterminate={isIndeterminate}
          data-disabled={isDisabled}
          data-focus-visible={isFocusVisible}
          aria-hidden="true"
        >
          {isIndeterminate && <IconMinusSmall data-sl-checkbox-check-mixed />}
          {isChecked && <IconCheckSmall data-sl-checkbox-check />}
        </div>
        {props.children ? (
          <Text
            variant="body"
            data-sl-checkbox-label
            data-disabled={isDisabled}
          >
            {props.children}
          </Text>
        ) : null}
      </label>
    )
  }
)

export function useCheckbox(props: CheckboxProps): AriaCheckbox {
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

  const { inputProps } = useReactAriaCheckbox(
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

export interface AriaCheckbox {
  inputRef: Ref<HTMLInputElement>
  isChecked: boolean
  isFocusVisible: boolean
  isIndeterminate: boolean
  isDisabled: boolean
  inputProps: ComponentPropsWithoutRef<'input'>
}

export interface CheckboxOptions {
  /**
   * Indicates the indeterminate state
   * @default
   */
  indeterminate?: boolean
  /**
   * Indicator value
   */
  value?: string
}

export type CheckboxProps = CheckboxOptions &
  Omit<ComponentPropsWithoutRef<'input'>, 'value'>
