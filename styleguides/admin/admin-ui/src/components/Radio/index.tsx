import { Ref } from 'react'
import {
  Radio as ReakitRadio,
  RadioProps as ReakitRadioProps,
  RadioStateReturn,
} from 'reakit/Radio'
import { forwardRef } from '@vtex-components/utils'

import { createElement } from '../unstableThemeProvider'
import { Overridable } from '../../types'
import { useComponent } from '../../hooks/useComponent'

export const Radio = forwardRef(
  (props: RadioProps, ref: Ref<HTMLInputElement>) => {
    const { size = 'regular', state, ...htmlProps } = props

    const radioProps = useComponent({
      props: htmlProps,
      themeKey: `components.radio.${size}`,
    })

    // TODO Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement<any>({
      component: ReakitRadio,
      htmlProps: radioProps,
      state,
      ref,
    })
  }
)

type AbstractRadioProps = Pick<
  ReakitRadioProps,
  | 'value'
  | 'disabled'
  | 'required'
  | 'name'
  | 'id'
  | 'checked'
  | 'aria-label'
  | 'aria-labelledby'
>

export interface RadioProps extends AbstractRadioProps, Overridable {
  /**
   * Radio size
   * @default 'regular'
   */
  size?: 'regular' | 'small'
  /**
   * useRadio() hook return
   */
  state: RadioStateReturn
}

export { useRadioState, RadioStateReturn } from 'reakit/Radio'
