import React from 'react'
import { Icon, IconProps } from '@vtex-components/icon'

export const IconHamburger = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 24 24">
    <rect width="24" height="24" fill="white" />
    <rect y="4" width="24" height="3" fill="#F71963" fillOpacity={1} />
    <rect y="10" width="24" height="3" fill="#F71963" fillOpacity={1} />
    <rect y="16" width="24" height="3" fill="#F71963" fillOpacity={1} />
  </Icon>
)
