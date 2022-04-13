import { Radio as AriakitRadio } from 'ariakit/radio'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './radio.style'

export const RadioButton = createComponent<typeof AriakitRadio>((props) => {
  return useElement(AriakitRadio, {
    ...props,
    baseStyle: style.radioButtonStyle,
  })
})

export type RadioButtonProps = React.ComponentPropsWithoutRef<
  typeof RadioButton
>
