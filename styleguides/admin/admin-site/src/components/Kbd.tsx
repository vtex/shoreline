import React from 'react'
import { Box, BoxProps } from '@vtex/admin-ui'

export default function Kbd(props: KbdProps) {
  return (
    <Box
      el="kbd"
      px="2"
      py="1"
      br="3"
      bs="solid"
      bc="muted.2"
      bg="muted.4"
      bbw="3"
      btw="1"
      blw="1"
      brw="1"
      fs="0"
      {...props}
    />
  )
}

export type KbdProps = BoxProps
