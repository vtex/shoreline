import type { Ref } from 'react'
import React, { forwardRef, useEffect, useRef } from 'react'
import { Checkbox as AriakitCheckbox } from 'ariakit/checkbox'
import { useForkRef } from '@vtex/admin-ui-hooks'

import { cx } from '@vtex/admin-ui-core'
import { checkboxTheme } from './checkbox.style'

export const CheckboxInput = forwardRef(function CheckboxInput(
  props: CheckboxInputProps,
  ref: Ref<HTMLInputElement>
) {
  const { error = false, state, className = '', ...htmlProps } = props

  const forkedRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (forkedRef.current && state) {
      forkedRef.current.indeterminate = state.value === 'indeterminate'
    }
  }, [state])

  return (
    <AriakitCheckbox
      state={state}
      ref={useForkRef(forkedRef, ref)}
      data-error={error}
      className={cx(checkboxTheme, className)}
      {...htmlProps}
    />
  )
})

export type CheckboxInputProps = React.ComponentPropsWithRef<
  typeof AriakitCheckbox
> & {
  /**
   * Whether has a error or not
   * @default false
   */
  error?: boolean
  /**
   * Checkbox id
   */
  id?: string
}
