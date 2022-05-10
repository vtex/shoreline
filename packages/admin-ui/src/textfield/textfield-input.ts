import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as style from './textfield.style'

export const TextfieldInput = createComponent<'input'>((props) => {
  return useElement('input', {
    baseStyle: style.input,
    ...props,
  })
})
