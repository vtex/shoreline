import { useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDismiss,
  ModalFooter,
  ModalHeader,
  ModalHeading,
} from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen((o) => !o)
  }

  return (
    <>
      <Button onClick={toggle}>Open Modal</Button>
      <Modal open={open} onClose={toggle}>
        <ModalHeader>
          <ModalHeading>Heading</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <DecorativeBox subtle height="360px" />
        </ModalContent>
        <ModalFooter>
          <Button onClick={toggle}>Close</Button>
          <Button variant="primary" onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
