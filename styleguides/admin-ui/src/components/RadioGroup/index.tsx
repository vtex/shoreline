/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Fragment } from 'react'
import {
  RadioGroup as ReakitRadioGroup,
  RadioGroupProps as ReakitRadioGroupProps,
} from 'reakit/Radio'

import { Label } from '../Label'

export function RadioGroup(props: RadioGroupProps) {
  const {
    sx = {},
    label,
    id,
    orientation = 'horizontal',
    size = 'regular',
    children,
    ...reakitProps
  } = props

  const styles = {
    variant: `forms.controlGroup-${orientation}-${size}`,
    ...sx,
  }

  return (
    <Fragment>
      {label && (
        <Label htmlFor={id} c="muted.0" fs="0" fw="regular">
          {label}
        </Label>
      )}
      <ReakitRadioGroup
        sx={styles}
        orientation={orientation}
        id={id}
        {...reakitProps}
      >
        {children}
      </ReakitRadioGroup>
    </Fragment>
  )
}

export interface RadioGroupProps extends ReakitRadioGroupProps {
  sx?: SxStyleProp
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
}
