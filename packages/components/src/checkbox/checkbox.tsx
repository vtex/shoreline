import React, { forwardRef } from 'react'
import { useMergeRef } from '@vtex/shoreline-utils'
import { IconCheckSmall, IconMinusSmall } from '@vtex/shoreline-icons'

import { VisuallyHidden } from '@vtex/shoreline-primitives'
import { useAriaCheckbox } from './use-aria-checkbox'
import type { AriaCheckboxProps } from './use-aria-checkbox'
import { Text } from '../text'
import './checkbox.css'

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
    } = useAriaCheckbox(props)

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
          <Text data-sl-checkbox-label data-disabled={isDisabled}>
            {props.children}
          </Text>
        ) : null}
      </label>
    )
  }
)

export type CheckboxProps = AriaCheckboxProps
