import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as style from './text-input.style'

export const TextInputTerm = createComponent<'div', TextInputTermProps>(
  (props) => {
    const { type, ...divProps } = props

    return useElement('div', {
      baseStyle: {
        ...style.term,
        ...style.termVariants({
          type,
        }),
      },
      ...divProps,
    })
  }
)

export type TextInputTermProps = VariantProps<typeof style.termVariants>
