import {
  Radio as ReakitRadio,
  RadioProps as ReakitRadioProps,
  RadioStateReturn,
} from 'reakit/Radio'
import { useSystem, createComponent } from '@vtex/admin-core'

import { SystemComponentProps } from '../../types'

export const Radio = createComponent(ReakitRadio, useRadio)

export function useRadio(props: RadioProps) {
  const { size = 'regular', state, csx, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    themeKey: `components.radio.${size}`,
    ...csx,
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
  | 'onBlur'
  | 'onClick'
  | 'onFocus'
  | 'checked'
  | 'aria-label'
  | 'aria-labelledby'
>

export interface RadioProps extends SystemComponentProps<AbstractRadioProps> {
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
