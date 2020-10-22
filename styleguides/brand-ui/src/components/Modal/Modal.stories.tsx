import React from 'react'
import { Meta } from '@storybook/react'

import { Modal, ModalProps, useModalState } from './index'
import { Button } from '../Button'

export default {
  title: 'beta/Modal',
  component: Modal,
} as Meta

const Template = (args: ModalProps) => {
  const modalState = useModalState({ animated: true })
  const { title, children, ...props } = args

  return (
    <Modal
      modalState={modalState}
      title={title}
      {...props}
      disclosure={<Button>Open Modal</Button>}
    >
      <Modal.Body>{children}</Modal.Body>
      <Modal.BottomBar>
        <Modal.Button variant="tertiary" onClick={modalState.hide}>
          Cancel
        </Modal.Button>
        <Modal.Button variant="primary" onClick={modalState.hide}>
          Accept
        </Modal.Button>
      </Modal.BottomBar>
    </Modal>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  children:
    'But if I just showed up at your party, would you have me? Would you want me?',
  title: 'Betty',
}
