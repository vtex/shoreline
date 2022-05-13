import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as inputStyle from '../text-input/text-input.style'
import * as style from './text-area.style'

export const TextAreaContainer = createComponent<
  'div',
  TextAreaContainerOptions
>((props) => {
  const { error = false, disabled = false, ...divProps } = props

  return useElement('div', {
    baseStyle: {
      ...inputStyle.container,
      ...style.container,
      ...inputStyle.containerVariants({
        error,
        disabled,
      }),
    },
    ...divProps,
  })
})

export type TextAreaContainerOptions = VariantProps<
  typeof inputStyle.containerVariants
>
