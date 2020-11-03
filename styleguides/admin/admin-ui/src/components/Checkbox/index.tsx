import { Ref } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit'
import { useClassName } from '@vtex/admin-ui-system'
import { forwardRef } from '@vtex-components/utils'

import { createElement } from '../unstableThemeProvider'
import { Overridable } from '../../types'

export const Checkbox = forwardRef(
  (props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
    const { htmlProps, state } = useCheckbox(props)

    return createElement({
      component: ReakitCheckbox,
      htmlProps,
      state,
      ref,
    })
  }
)

export function useCheckbox(
  props: CheckboxProps,
  themeKey = 'components.checkbox'
) {
  const { size = 'regular', styleOverrides, state, ...restProps } = props

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `${themeKey}.${size}`,
  })

  return { htmlProps: { className, ...restProps }, state }
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
