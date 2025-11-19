import { useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDismiss,
  ModalHeader,
  ModalHeading,
  Text,
} from '@vtex/shoreline'

export function SmallModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Small Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="small">
        <ModalHeader>
          <ModalHeading>Small Modal</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Text variant="body">This is a small modal</Text>
        </ModalContent>
      </Modal>
    </>
  )
}

export function MediumModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Medium Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="medium">
        <ModalHeader>
          <ModalHeading>Medium Modal</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Text variant="body">This is a medium modal</Text>
        </ModalContent>
      </Modal>
    </>
  )
}

export function LargeModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="large">
        <ModalHeader>
          <ModalHeading>Large Modal</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Text variant="body">This is a large modal</Text>
        </ModalContent>
      </Modal>
    </>
  )
}
