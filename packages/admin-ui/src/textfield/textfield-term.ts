import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as style from './textfield.style'

export const TextfieldTerm = createComponent<'div', TextfieldTermProps>(
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

export type TextfieldTermProps = VariantProps<typeof style.termVariants>
