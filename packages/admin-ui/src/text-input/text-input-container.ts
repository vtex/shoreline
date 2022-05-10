import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as style from './text-input.style'

export const TextInputContainer = createComponent<
  'div',
  TextInputContainerOptions
>((props) => {
  const { error = false, disabled = false, ...divProps } = props

  return useElement('div', {
    baseStyle: {
      ...style.container,
      ...style.containerVariants({
        error,
        disabled,
      }),
    },
    ...divProps,
  })
})

export type TextInputContainerOptions = VariantProps<
  typeof style.containerVariants
>
