import { Checkbox as ReakitCheckbox } from 'reakit'
import { createComponent } from '@vtex/admin-core'
import {
  useCheckbox,
  CheckboxProps,
  useCheckboxState,
  CheckboxStateReturn,
} from '../Checkbox'

export const Toggle = createComponent(ReakitCheckbox, useToggle)

export function useToggle(props: ToggleProps) {
  const checkboxProps = useCheckbox(props)

  return { ...checkboxProps, role: 'switch' }
}

export type ToggleProps = CheckboxProps
export type ToggleStateReturn = CheckboxStateReturn

export { useCheckboxState as useToggleState }
