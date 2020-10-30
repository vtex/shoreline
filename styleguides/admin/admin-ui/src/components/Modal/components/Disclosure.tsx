import React, { Children, cloneElement, FunctionComponentElement } from 'react'

import { AbstractModalDisclosure } from './Abstract'
import { ModalStateReturn } from '../state'

/**
 * Toggle StatelessModal visibility
 *
 * @example
 * ```jsx
 * import { useModalState, ModalDisclosure } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 * <ModalDisclosure {...state}>
 *  <button>Open Modal</button>
 * </ModalDisclosure>
 * ```
 */
export function ModalDisclosure(props: ModalDisclosureProps) {
  const { children, state } = props

  Children.only(children)

  return (
    <AbstractModalDisclosure {...state} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </AbstractModalDisclosure>
  )
}

export interface ModalDisclosureProps {
  state: ModalStateReturn
  /**
   * children component
   * ✅ do: pass a single node
   */
  children: FunctionComponentElement<unknown>
}
