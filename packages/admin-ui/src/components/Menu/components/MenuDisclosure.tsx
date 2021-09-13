import type { FunctionComponentElement } from 'react'
import React, { Children, cloneElement } from 'react'

import type { MenuStateReturn } from './AriaMenu'
import { ReakitMenuButton } from './AriaMenu'

export function MenuDisclosure(props: MenuDisclosureProps) {
  const { children, state } = props

  Children.only(children)

  return (
    <ReakitMenuButton {...state} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </ReakitMenuButton>
  )
}

export interface MenuDisclosureProps {
  /**
   * return of useMenuState
   */
  state: MenuStateReturn
  /**
   * disclosure children
   */
  children: FunctionComponentElement<unknown>
}
