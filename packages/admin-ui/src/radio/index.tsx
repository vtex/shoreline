import { Radio as ReakitRadio } from 'reakit/Radio'
import type { RadioStateReturn } from 'reakit/Radio'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './Radio.style'

export const Radio = createComponent<typeof ReakitRadio, RadioOptions>(
  (props) => {
    const { state, ...restProps } = props

    return useElement(ReakitRadio, {
      ...restProps,
      ...state,
      baseStyle: style.radioStyle,
    })
  }
)

interface RadioOptions {
  state: RadioStateReturn
}

export { useRadioState, RadioStateReturn } from 'reakit/Radio'

export type RadioProps = React.ComponentPropsWithoutRef<typeof Radio>
