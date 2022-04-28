import { Checkbox as AriakitCheckbox } from 'ariakit/Checkbox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './checkbox.style'

export const CheckboxInput = createComponent<
  typeof AriakitCheckbox,
  CheckboxInputOptions
>((props) => {
  return useElement(AriakitCheckbox, {
    ...props,
    baseStyle: {
      ...style.checkboxStyle,
      ...(props.error ? style.error : {}),
    },
  })
})

export interface CheckboxInputOptions {
  error?: boolean
  id?: string
}

export type CheckboxProps = React.ComponentPropsWithRef<typeof CheckboxInput>
