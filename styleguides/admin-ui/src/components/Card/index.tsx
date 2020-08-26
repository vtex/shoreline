import React, { Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

import { Box, BoxProps } from '../Box'

export const Card = forwardRef(
  ({ children, sx, ...restProps }: BoxProps, ref: Ref<HTMLDivElement>) => {
    return (
      <Box
        sx={{
          padding: 13,
          backgroundColor: 'background',
          border: 'solid',
          borderColor: 'muted.3',
          borderWidth: 1,
          borderRadius: 3,
          ...sx,
        }}
        {...restProps}
        ref={ref}
      >
        {children}
      </Box>
    )
  }
)
export type CardProps = BoxProps
