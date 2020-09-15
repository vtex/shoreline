import React, { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'
import { SxStyleProp } from 'theme-ui'

import { Box } from '../Box'

export const Card = forwardRef((props: CardProps, ref: Ref<HTMLDivElement>) => {
  const { sx, children } = props

  return (
    <Box
      bg="background"
      bc="muted.3"
      p="13"
      sx={{
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3,
        ...sx,
      }}
      ref={ref}
    >
      {children}
    </Box>
  )
})
export interface CardProps {
  /**
   * ThemeUI style props
   * @default {}
   * */
  sx?: SxStyleProp
  /**
   * React children prop
   * */
  children?: ReactNode
}
