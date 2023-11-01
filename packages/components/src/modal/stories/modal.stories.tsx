import '../../../dist/styles.min.css'
import '../modal.css'
import React, { useState } from 'react'

import { Modal, ModalHeader } from '../index'
import { Button } from '../../button'
import { Content } from '../../content'
import { Flex } from '../../flex'

export default {
  title: 'shoreline-components/modal',
}

export function Default() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Content>This is a super basic modal</Content>
      </Modal>
    </>
  )
}

export function Complete() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Confirm action</ModalHeader>
        <Content>
          You are trying to do something, are you sure you want to do what
          you're about to do?
        </Content>
        <Content narrow>
          <Flex justify="end" columnGap="0.5rem">
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Ok
            </Button>
          </Flex>
        </Content>
      </Modal>
    </>
  )
}
