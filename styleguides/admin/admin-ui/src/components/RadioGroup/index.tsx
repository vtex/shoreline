import React, { Fragment, ReactNode } from 'react'
import { useClassName } from '@vtex/admin-ui-system'
import {
  RadioGroup as ReakitRadioGroup,
  RadioGroupProps as ReakitRadioGroupProps,
} from 'reakit/Radio'

import { Overridable } from '../../types'
import { Label } from '../Label'

export function RadioGroup(props: RadioGroupProps) {
  const {
    label,
    orientation = 'horizontal',
    size = 'regular',
    styleOverrides,
    id,
    state,
    children,
    ...htmlProps
  } = props

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `components.controlGroup.${orientation}-${size}`,
  })

  return (
    <Fragment>
      {label && <Label htmlFor={id}>{label}</Label>}
      <ReakitRadioGroup
        className={className}
        orientation={orientation}
        id={id}
        {...state}
        {...htmlProps}
      >
        {children}
      </ReakitRadioGroup>
    </Fragment>
  )
}

export interface RadioGroupProps extends Overridable {
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
  state: ReakitRadioGroupProps
  children?: ReactNode
  id?: string
}
