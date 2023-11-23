import type { MenuProviderProps } from '@ariakit/react'
import { MenuProvider as Provider } from '@ariakit/react'
import React from 'react'

export function MenuProvider(props: MenuProviderProps) {
  const { placement = 'bottom-end', ...otherProps } = props

  return <Provider placement={placement} {...otherProps} />
}
