import '../../../dist/styles.min.css'
import '../modal.css'
import React from 'react'

import { Modal, ModalHeader, useModal } from '../index'
import { Button } from '../../button'
import { Content } from '../../content'
import { Flex } from '../../flex'

export default {
  title: 'shoreline-components/modal',
}

export function Default() {
  const { open, show, hide } = useModal()

  return (
    <>
      <Button onClick={show}>Open modal</Button>
      <Modal open={open} onClose={hide}>
        <Content>This is a super basic modal</Content>
      </Modal>
    </>
  )
}

export function Complete() {
  const { open, show, hide } = useModal()

  return (
    <>
      <Button onClick={show}>Open modal</Button>
      <Modal open={open} onClose={hide}>
        <ModalHeader onClose={hide}>Confirm action</ModalHeader>
        <Content>
          You are trying to do something, are you sure you want to do what
          you're about to do?
        </Content>
        <Content narrow>
          <Flex justify="end" columnGap="0.5rem">
            <Button onClick={hide}>Close</Button>
            <Button variant="primary" onClick={hide}>
              Ok
            </Button>
          </Flex>
        </Content>
      </Modal>
    </>
  )
}
