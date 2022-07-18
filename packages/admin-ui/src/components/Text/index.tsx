import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as style from './text.style'

export const Text = createComponent<'span', TextOptions>((props) => {
  const { tone = 'primary', variant = 'body', ...restProps } = props

  return useElement('span', {
    ...restProps,
    baseStyle: style.variants({ variant, tone }),
  })
})

export type TextOptions = VariantProps<typeof style.variants>

export type TextProps = ComponentPropsWithRef<typeof Text>
