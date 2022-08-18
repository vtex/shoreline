import type { FunctionComponentElement } from 'react'
import React, { Children, cloneElement } from 'react'
import { DialogDisclosure } from 'reakit'

import type { ModalStateReturn } from '../state'

/**
 * Toggle StatelessModal visibility
 *
 * @example
 * ```jsx
 * import { useModalState, ModalDisclosure } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 *
 * <ModalDisclosure state={state}>
 *  <button>Open Modal</button>
 * </ModalDisclosure>
 * ```
 */
export function ModalDisclosure(props: ModalDisclosureProps) {
  const { children, state } = props

  Children.only(children)

  return (
    <DialogDisclosure
      state={state}
      ref={children.ref}
      {...(children as any).props}
    >
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </DialogDisclosure>
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
