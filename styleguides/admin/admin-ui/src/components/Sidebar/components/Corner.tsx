import React, { cloneElement, FunctionComponentElement } from 'react'
import { Set } from '../../Set'
import { CornerScope, SidebarSecretProps } from '../utils'
import { SidebarItemProps } from './index'

export interface SidebarCornerProps extends SidebarSecretProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export function SidebarCorner(props: Omit<SidebarCornerProps, 'secret'>) {
  const { children, scope } = props

  return (
    <Set spacing={1} orientation="vertical">
      {children.map((child, index) =>
        // @ts-ignore
        // This line is ignored because there is no typing for
        // this prop available, as it's supposed to be 'hidden'
        // from the client. Another approach to pass this state
        // down would be to use the Context API, but since every
        // change in any of the context attributes would make the
        // context consuming elements re-render, we end up avoiding
        // unecessery re-renders everytime the user navigates
        // through the keyboard.
        cloneElement(child, { secret: props.secret, scope, index })
      )}
    </Set>
  )
}
