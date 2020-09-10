/** @jsx jsx */
import { jsx, Label, SxStyleProp } from 'theme-ui'
import { ReactNode } from 'react'
import {
  Radio as ReakitRadio,
  RadioStateReturn,
  RadioGroup as ReakitRadioGroup,
  RadioGroupProps as ReakitRadioGroupProps,
} from 'reakit/Radio'

export interface RadioProps {
  label: ReactNode
  value: string
  state: RadioStateReturn
}

export function Radio(props: RadioProps) {
  const { label, value, state } = props

  return (
    <Label>
      <ReakitRadio {...state} value={value} /> {label}
    </Label>
  )
}

export interface RadioGroupProps
  extends Omit<ReakitRadioGroupProps, 'aria-label'> {
  label: string
  sx?: SxStyleProp
}

export function RadioGroup(props: RadioGroupProps) {
  const { label, sx = {}, ...baseProps } = props

  return <ReakitRadioGroup {...baseProps} sx={sx} aria-label={label} />
}

export { useRadioState } from 'reakit/Radio'
