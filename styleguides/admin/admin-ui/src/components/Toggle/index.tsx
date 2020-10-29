import { Ref, forwardRef } from 'react'
import { createElement } from '@vtex/admin-ui-system'
import { Checkbox as ReakitCheckbox } from 'reakit'

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
  const htmlProps = useCheckbox(props, 'components.toggle')

  return createElement({
    component: ReakitCheckbox,
    htmlProps: { role: 'switch', ...htmlProps },
    ref,
  })
})

export type ToggleProps = CheckboxProps
export type ToggleStateReturn = CheckboxStateReturn

export { useCheckboxState as useToggleState }
