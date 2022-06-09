import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'

export function Menu(props: MenuOptions) {
  const { children } = props

  return <>{children}</>
}

export interface MenuOptions {
  children?: ReactNode
}

export type MenuProps = ComponentPropsWithRef<typeof Menu>
