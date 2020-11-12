import React, { FunctionComponentElement, Children, cloneElement } from 'react'

import { AriaMenuButton, MenuStateReturn } from './index'

export function MenuDisclosure(props: MenuDisclosureProps) {
  const { children, state } = props

  Children.only(children)

  return (
    <AriaMenuButton {...state} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </AriaMenuButton>
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
