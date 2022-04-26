import { Checkbox as AriakitCheckbox } from 'ariakit/Checkbox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './checkbox.style'

export interface CheckboxOptions {
  /** Checkbox Id */
  id?: string
}

export const Checkbox = createComponent<
  typeof AriakitCheckbox,
  CheckboxOptions
>((props) => {
  return useElement(AriakitCheckbox, {
    ...props,
    baseStyle: style.checkboxStyle,
  })
})

export type CheckboxProps = React.ComponentPropsWithRef<typeof Checkbox>

export { useCheckboxState } from 'ariakit/Checkbox'
