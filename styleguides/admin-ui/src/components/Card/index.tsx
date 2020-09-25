import React, { Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

import { Box, BoxProps as CardProps } from '../Box'

export const Card = forwardRef((props: CardProps, ref: Ref<HTMLDivElement>) => {
  return (
    <Box
      ref={ref}
      bg="background"
      bc="muted.3"
      p="13"
      bw="1"
      bs="solid"
      br="3"
      {...props}
    />
  )
})

export { CardProps }
