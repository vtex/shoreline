import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './text-area.style'

export const TextAreaElement = createComponent<'textarea'>((props) => {
  return useElement('textarea', {
    baseStyle: style.input,
    ...props,
  })
})
