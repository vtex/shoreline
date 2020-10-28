import { Ref } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit'
import { createElement } from '@vtex/admin-ui-system'
import { forwardRef } from '@vtex-components/utils'

import { Overridable } from '../../types'
import { useComponent } from '../../hooks/useComponent'

export const Checkbox = forwardRef(
  (props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
    const { size = 'regular', ...htmlProps } = props

    const checkboxProps = useComponent({
      props: htmlProps,
      themeKey: `components.checkbox.${size}`,
    })

    return createElement({
      component: ReakitCheckbox,
      htmlProps: { ...checkboxProps, ...htmlProps },
      ref,
    })
  }
)

type AbstractCheckboxProps = Pick<
  ReakitProps,
  | 'checked'
  | 'required'
  | 'disabled'
  | 'value'
  | 'name'
  | 'onChange'
  | 'state'
  | 'setState'
  | 'onClick'
  | 'aria-label'
  | 'aria-labelledby'
  | 'id'
>

export interface CheckboxProps extends AbstractCheckboxProps, Overridable {
  /**
   *  Checkbox Size
   * @default regular
   */
  size?: 'regular' | 'small'
}

export { useCheckboxState }
export { CheckboxStateReturn }
