import { Ref } from 'react'
import {
  Radio as ReakitRadio,
  RadioProps as ReakitRadioProps,
  RadioStateReturn,
} from 'reakit/Radio'
import { forwardRef } from '@vtex/admin-ui-system'

import { cn, createElement } from '../../system'
import { Overridable } from '../../types'

export const Radio = forwardRef(
  (props: RadioProps, ref: Ref<HTMLInputElement>) => {
    const htmlProps = useRadio(props)

    // TODO Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement<any>({
      component: ReakitRadio,
      htmlProps,
      ref,
    })
  }
)

export function useRadio(props: RadioProps){
  const { size = 'regular', state, styleOverrides, ...htmlProps } = props

  const className = cn({
    themeKey: `components.radio.${size}`,
    ...styleOverrides,
  })

  return {className, ...state, ...htmlProps}
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
