import { Ref, forwardRef } from 'react'
import { Checkbox as ReakitCheckbox } from 'reakit'

import { createElement } from '../../system'
import {
  useCheckbox,
  CheckboxProps,
  useCheckboxState,
  CheckboxStateReturn,
} from '../Checkbox'

export const Toggle = forwardRef(function Toggle(
  props: ToggleProps,
  ref: Ref<HTMLInputElement>
) {
  const { htmlProps, state } = useCheckbox(props, 'components.toggle')

  return createElement({
    component: ReakitCheckbox,
    htmlProps: { role: 'switch', ...htmlProps },
    state,
    ref,
  })
})

export type ToggleProps = CheckboxProps
export type ToggleStateReturn = CheckboxStateReturn

export { useCheckboxState as useToggleState }
