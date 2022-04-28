import { Checkbox as AriakitCheckbox } from 'ariakit/Checkbox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './checkbox.style'

export const CheckboxInput = createComponent<
  typeof AriakitCheckbox,
  CheckboxInputOptions
>((props) => {
  const { error = false, ...htmlProps } = props

  return useElement(AriakitCheckbox, {
    ...htmlProps,
    baseStyle: {
      ...style.checkboxStyle,
      ...(error ? style.error : {}),
    },
  })
})

export interface CheckboxInputOptions {
  error?: boolean
  id?: string
}

export type CheckboxInputProps = React.ComponentPropsWithRef<
  typeof CheckboxInput
>
