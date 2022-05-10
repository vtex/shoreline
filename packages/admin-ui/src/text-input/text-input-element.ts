import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as style from './text-input.style'

export const TextInputElement = createComponent<'input'>((props) => {
  return useElement('input', {
    baseStyle: style.input,
    ...props,
  })
})
