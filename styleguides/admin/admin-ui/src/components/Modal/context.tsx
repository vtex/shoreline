import React from 'react'
import { DialogStateReturn } from 'reakit/Dialog'
import invariant from 'tiny-invariant'

import { ModalFooterSize, ModalSize } from './Stateless'

const ModalContext = React.createContext<{
  state: DialogStateReturn
  handleClose: () => void
  omitCloseButton?: boolean
  hasHeader: boolean
  hasFooter: boolean
  size: ModalSize
  footerSize?: ModalFooterSize
} | null>(null)

export function useModalContext() {
  const context = React.useContext(ModalContext)

  invariant(context, 'You must use Modal composites inside Modal context!')

  return context
}

const { Provider } = ModalContext

export { Provider as ModalProvider }
