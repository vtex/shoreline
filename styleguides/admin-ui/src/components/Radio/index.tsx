/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Radio as ReakitRadio,
  RadioProps as ReakitRadioProps,
  RadioGroup as ReakitRadioGroup,
  RadioGroupProps as ReakitRadioGroupProps,
  RadioStateReturn,
} from 'reakit/Radio'
import { Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

import { useFocusHollow } from '../../hooks'

export interface RadioProps
  extends Pick<
    ReakitRadioProps,
    | 'value'
    | 'disabled'
    | 'required'
    | 'name'
    | 'id'
    | 'checked'
    | 'aria-label'
    | 'aria-labelledby'
  > {
  /**
   * Radio size
   * @default 'regular'
   */
  size?: 'regular' | 'small'
  /**
   * useRadioState() hook return
   */
  state: RadioStateReturn
  /**
   * ThemeUI Style prop
   */
  sx?: SxStyleProp
}

export const Radio = forwardRef(
  (props: RadioProps, ref: Ref<HTMLInputElement>) => {
    const { size = 'regular', sx, state, ...baseProps } = props

    const { focusProps, focusStyles } = useFocusHollow()
    const styles = { variant: `forms.radio-${size}`, ...focusStyles, ...sx }

    return (
      <ReakitRadio
        ref={ref}
        sx={styles}
        {...state}
        {...focusProps}
        {...baseProps}
      />
    )
  }
)

export interface RadioGroupProps
  extends Omit<ReakitRadioGroupProps, 'aria-label'> {
  label: string
  sx?: SxStyleProp
}

export function RadioGroup(props: RadioGroupProps) {
  const { label, ...baseProps } = props

  return <ReakitRadioGroup {...baseProps} aria-label={label} />
}

export { useRadioState, RadioStateReturn } from 'reakit/Radio'
