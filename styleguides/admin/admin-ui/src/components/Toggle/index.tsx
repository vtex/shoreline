import { Ref, forwardRef } from 'react'
import { Checkbox as ReakitCheckbox } from 'reakit'

import { jsx } from '../../system'
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
  const toggleProps = useCheckbox(props, 'components.toggle')

  return jsx({
    component: ReakitCheckbox,
    props: { role: 'switch', ...toggleProps },
    ref,
  })
})

export type ToggleProps = CheckboxProps
export type ToggleStateReturn = CheckboxStateReturn

export { useCheckboxState as useToggleState }
