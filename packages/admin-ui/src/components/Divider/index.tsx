import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import type { ComponentPropsWithRef } from 'react'
import { Separator as ReakitSeparator } from 'reakit/Separator'

import * as style from './divider.style'

/**
 * It renders an hr element and grants accessibility as described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).
 */
export const Divider = createComponent<typeof ReakitSeparator, DividerOptions>(
  (props) => {
    const { orientation = 'horizontal', ...restProps } = props

    return useElement(ReakitSeparator, {
      baseStyle: {
        ...style.baseline,
        ...style.variants({ orientation }),
      },
      ...restProps,
    })
  }
)

export type DividerOptions = VariantProps<typeof style.variants>

export type DividerProps = ComponentPropsWithRef<typeof Divider>
