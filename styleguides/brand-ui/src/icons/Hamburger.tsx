import React from 'react'
import { Icon, IconProps } from '@vtex-components/icon'

export const IconHamburger = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 24 24">
    <rect y="4" width="24" height="3" rx="1.5" fill="#E31C58" />
    <rect y="10" width="24" height="3" rx="1.5" fill="#E31C58" />
    <rect y="16" width="24" height="3" rx="1.5" fill="#E31C58" />
  </Icon>
)
