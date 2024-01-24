import React, { useState } from 'react'

import {
  Modal,
  ModalContent,
  ModalDismiss,
  ModalFooter,
  ModalHeader,
  ModalHeading,
} from '../../index'

import '../stories.css'
import { Button } from '../../../button'
import { Slot } from '../../../slot'

export default {
  title: 'components/modal/examples',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function Size() {
  const [modal, setModal] = useState({ open: false, size: 'medium' })

  return (
    <>
      <Button onClick={() => setModal({ open: true, size: 'small' })}>
        Open modal small
      </Button>
      <Button onClick={() => setModal({ open: true, size: 'medium' })}>
        Open modal medium
      </Button>
      <Button onClick={() => setModal({ open: true, size: 'large' })}>
        Open modal large
      </Button>
      <Modal
        size={modal.size as any}
        open={modal.open}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      >
        <ModalHeader>
          <ModalHeading>Confirm action</ModalHeading>
          <Slot>
            <Button variant="tertiary" size="large">
              Action
            </Button>
            <ModalDismiss />
          </Slot>
        </ModalHeader>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla
          posuere sollicitudin aliquam ultrices sagittis orci. Vel risus commodo
          viverra maecenas. Montes nascetur ridiculus mus mauris vitae ultricies
          leo. Nibh cras pulvinar mattis nunc. Mattis aliquam faucibus purus in
          massa tempor nec. Cursus mattis molestie a iaculis at. Dolor sed
          viverra ipsum nunc aliquet bibendum. In eu mi bibendum neque egestas
          congue. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
          fermentum odio. At tellus at urna condimentum mattis pellentesque id.
        </ModalContent>
        <ModalFooter>
          <Button
            onClick={() => setModal((prev) => ({ ...prev, open: false }))}
            size="large"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => setModal((prev) => ({ ...prev, open: false }))}
            size="large"
          >
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
