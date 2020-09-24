import React from 'react'
import { Icon, IconProps } from '@vtex-components/icon'

export const IconExternalLink = (props: IconProps) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.77778 22.1602H22.2222V12.4651H25V22.1602C25 23.6906 23.7569 24.9302 22.2222 24.9302H2.77778C1.24306 24.9302 0 23.6906 0 22.1602V2.77002C0 1.23958 1.24306 0 2.77778 0H12.5V2.77002H2.77778V22.1602Z"
        fill="#F71963"
        fillOpacity={1}
      />
      <path
        d="M15.4211 2.86378V0H25V10.0232H22.2632V4.88991L14.0526 13.9609L12 11.8131L20.3268 2.86378H15.4211Z"
        fill="#F71963"
        fillOpacity={1}
      />
    </Icon>
  )
}
