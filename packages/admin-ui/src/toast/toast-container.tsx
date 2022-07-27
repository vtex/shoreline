import type { VariantProps } from '@vtex/admin-ui-core'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './toast.style'

export const ToastContainer = createComponent<'div', ToastContainerOptions>(
  (props) => {
    const { variant = 'info', ...restProps } = props

    return useElement('div', {
      ...restProps,
      baseStyle: {
        ...style.toastContainer,
        ...style.toastContainerVariants({ variant }),
      },
    })
  }
)

export type ToastContainerOptions = VariantProps<
  typeof style.toastContainerVariants
>
