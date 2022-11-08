import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { Button } from '../../button'
import {
  Modal,
  useModalState,
  ModalHeader,
  ModalTitle,
  ModalDismiss,
  ModalContent,
  ModalFooter,
} from '../index'

export default {
  title: 'admin-ui-review/modal',
} as Meta

export function Basic() {
  const modal = useModalState()

  return (
    <>
      <Button onClick={modal.toggle}>Show modal</Button>
      <Modal state={modal}>
        <p>
          Your payment has been successfully processed. We have emailed your
          receipt.
        </p>
      </Modal>
    </>
  )
}

export function CompoundComponents() {
  const modal = useModalState()

  return (
    <>
      <Button onClick={modal.toggle}>Show modal</Button>
      <Modal state={modal}>
        <ModalHeader>
          <ModalTitle>Success</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <p>
            Your payment has been successfully processed. We have emailed your
            receipt.
          </p>
        </ModalContent>
        <ModalFooter>
          <ModalDismiss>OK</ModalDismiss>
        </ModalFooter>
      </Modal>
    </>
  )
}
