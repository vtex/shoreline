import React from 'react'

import { Box, BoxProps } from '../Box'

/**
 * Form label component.
 * It renders a label jsx element by default
 * @example

 * import { Label, LabelProps } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <Label>Your label here!</Label>
 * }
 */
export function Label({ children, ...props }: LabelProps) {
  return (
    <Box el="label" {...props}>
      {children}
    </Box>
  )
}

export interface LabelProps extends Omit<BoxProps, 'el'> {
  htmlFor?: string
}
