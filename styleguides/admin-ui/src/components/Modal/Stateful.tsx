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
Modal.Title = StatelessModal.Title
Modal.Content = StatelessModal.Content
Modal.Footer = StatelessModal.Footer

export interface ModalProps
  extends Omit<StatelessModalProps, 'state'>,
    Pick<DisclosureInitialState, 'visible'> {
  disclosure: FunctionComponentElement<unknown>
}
