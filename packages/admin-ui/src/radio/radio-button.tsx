import { Radio as ReakitRadio } from 'reakit/Radio'
import type { RadioStateReturn } from 'reakit/Radio'

import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './radio.style'

export const RadioButton = createComponent<
  typeof ReakitRadio,
  RadioButtonOptions
>((props) => {
  const { state, ...restProps } = props

  return useElement(ReakitRadio, {
    ...restProps,
    ...state,
    baseStyle: style.radioButtonStyle,
  })
})

export interface RadioButtonOptions {
  state: RadioStateReturn
}

export { RadioStateReturn } from 'reakit/Radio'

export type RadioButtonProps = React.ComponentPropsWithoutRef<
  typeof RadioButton
>
