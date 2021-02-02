import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit/Checkbox'

import { useSystem, createComponent } from '@vtex/admin-core'
import { Overridable } from '../../types'

export const Checkbox = createComponent(ReakitCheckbox, useCheckbox)

export function useCheckbox(props: CheckboxProps) {
  const { size = 'regular', styleOverrides, state, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    themeKey: {
      checkbox: { size },
    },
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
