import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as textInputStyle from '../text-input/text-input.style'
import * as style from './text-area.style'

export const TextAreaElement = createComponent<'textarea'>((props) => {
  return useElement('textarea', {
    baseStyle: { ...textInputStyle.input, ...style.input },
    ...props,
  })
})
