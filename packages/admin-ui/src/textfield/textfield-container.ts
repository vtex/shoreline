import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as style from './textfield.style'

export const TextfieldContainer = createComponent<
  'div',
  TextfieldContainerOptions
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

export type TextfieldContainerOptions = VariantProps<
  typeof style.containerVariants
>
