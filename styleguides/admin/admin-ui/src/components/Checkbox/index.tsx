import { Ref } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit/Checkbox'
import { forwardRef } from '@vtex/admin-ui-system'

import { createElement, cn } from '../../system'
import { Overridable } from '../../types'

export const Checkbox = forwardRef(
  (props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
    const htmlProps = useCheckbox(props)

    return createElement({
      component: ReakitCheckbox,
      htmlProps,
      ref,
    })
  }
)

export function useCheckbox(
  props: CheckboxProps,
  themeKey = 'components.checkbox'
) {
  const { size = 'regular', styleOverrides, state, ...htmlProps } = props

  const className = cn({
    themeKey: `${themeKey}.${size}`,
    ...styleOverrides,
  })

  return { className, ...state, ...htmlProps }
}

type AbstractCheckboxProps = Pick<
  ReakitProps,
  | 'checked'
  | 'required'
  | 'disabled'
  | 'value'
  | 'name'
  | 'onChange'
  | 'onClick'
  | 'aria-label'
  | 'aria-labelledby'
  | 'id'
>

type State = Pick<ReakitProps, 'state' | 'setState'>

export interface CheckboxProps extends AbstractCheckboxProps, Overridable {
  /**
   *  Checkbox Size
   * @default regular
   */
  size?: 'regular' | 'small'
  /**
   * Return of `useCheckboxState`
   */
  state?: State
}

export { useCheckboxState }
export { CheckboxStateReturn }
