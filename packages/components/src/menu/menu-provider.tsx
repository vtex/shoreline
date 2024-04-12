import type { MenuProviderProps as ProviderProps } from '@ariakit/react'
import { MenuProvider as Provider } from '@ariakit/react'
import React from 'react'

/**
 * Menu state provider
 */
export function MenuProvider(props: MenuProviderProps) {
  const { placement = 'bottom-end', ...otherProps } = props

  return <Provider placement={placement} {...otherProps} />
}

export type MenuProviderProps = ProviderProps
export type MenuProviderOptions = MenuProviderProps
