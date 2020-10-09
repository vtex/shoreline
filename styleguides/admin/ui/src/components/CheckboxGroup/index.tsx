import React, { ReactNode } from 'react'
import { SxStyleProp } from 'theme-ui'

import { Label } from '../Label'
import { Box } from '../Box'

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    sx = {},
    label,
    id,
    orientation = 'horizontal',
    size = 'regular',
    children,
  } = props

  const styles = {
    variant: `forms.controlGroup-${orientation}-${size}`,
    ...sx,
  }

  return (
    <>
      {label && (
        <Label htmlFor={id} c="muted.0" fs="0" fw="regular">
          {label}
        </Label>
      )}
      <Box role="group" id={id} sx={styles}>
        {children}
      </Box>
    </>
  )
}

export interface CheckboxGroupProps {
  children?: ReactNode
  id?: string
  sx?: SxStyleProp
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
}
