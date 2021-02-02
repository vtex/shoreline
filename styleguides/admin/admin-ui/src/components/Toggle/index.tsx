import { Checkbox as ReakitCheckbox } from 'reakit'
import { createComponent, useSystem } from '@vtex/admin-core'
import {
  CheckboxProps,
  useCheckboxState,
  CheckboxStateReturn,
} from '../Checkbox'

export const Toggle = createComponent(ReakitCheckbox, useToggle)

export function useToggle(props: ToggleProps) {
  const { size = 'regular', styleOverrides, state, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    themeKey: {
      toggle: { size },
    },
    ...styleOverrides,
  })

  return { className, role: 'switch', ...state, ...htmlProps }
}

export type ToggleProps = CheckboxProps
export type ToggleStateReturn = CheckboxStateReturn

export { useCheckboxState as useToggleState }
