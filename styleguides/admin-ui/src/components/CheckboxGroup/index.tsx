import React, { ReactNode } from 'react'
import { SxStyleProp } from 'theme-ui'
import { mergeSx } from '@vtex-components/theme'

import { Label } from '../Label'
import { Box } from '../Box'

export function CheckboxGroup({
  sx = {},
  label,
  id,
  orientation = 'horizontal',
  size = 'regular',
  children,
}: CheckboxGroupProps) {
  const styles = mergeSx<SxStyleProp>(
    {
      variant: `forms.controlGroup-${orientation}-${size}`,
    },
    sx
  )

  return (
    <>
      {label && (
        <Label htmlFor={id} c="muted.0" fs="0" fv="regular">
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
