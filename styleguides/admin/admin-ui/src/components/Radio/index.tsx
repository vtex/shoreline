import { Ref } from 'react'
import {
  Radio as ReakitRadio,
  RadioProps as ReakitRadioProps,
  RadioStateReturn,
} from 'reakit/Radio'
import { forwardRef } from '@vtex/admin-core'

import { useSystem, jsxs } from '../../system'
import { Overridable } from '../../types'

export const Radio = forwardRef(
  (props: RadioProps, ref: Ref<HTMLInputElement>) => {
    const radioProps = useRadio(props)

    return jsxs({
      component: ReakitRadio,
      props: radioProps,
      ref,
    })
  }
)

export function useRadio(props: RadioProps) {
  const { size = 'regular', state, styleOverrides, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    themeKey: `components.radio.${size}`,
    ...styleOverrides,
  })

  return { className, ...state, ...htmlProps }
}

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
