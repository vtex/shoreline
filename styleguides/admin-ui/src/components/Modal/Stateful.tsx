import React, { Fragment, FunctionComponentElement } from 'react'
import { DisclosureInitialState } from 'reakit/ts'

import {
  StatelessModal,
  StatelessModalProps,
  ModalDisclosure,
  useModalState,
} from './Stateless'

export function Modal(props: ModalProps) {
  const { disclosure, visible, ...modalProps } = props
  const state = useModalState({ visible })

  return (
    <Fragment>
      <ModalDisclosure {...state}>{disclosure}</ModalDisclosure>
      <StatelessModal state={state} {...modalProps} />
    </Fragment>
  )
}

Modal.Header = StatelessModal.Header
Modal.Content = StatelessModal.Content
Modal.Footer = StatelessModal.Footer
Modal.Button = StatelessModal.Button

export interface ModalProps
  extends Omit<StatelessModalProps, 'state'>,
    Pick<DisclosureInitialState, 'visible'> {
  /**
   * Visibility toggle. It implements the [WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices/#disclosure)
   */
  disclosure: FunctionComponentElement<unknown>
}
