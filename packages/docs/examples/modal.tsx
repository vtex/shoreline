import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDismiss,
  ModalFooter,
  ModalHeader,
  ModalHeading,
} from '@vtex/shoreline'

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit
          scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
          tristique senectus. Morbi tristique senectus et netus et. Nec
          tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.
          Morbi tristique senectus et netus et malesuada fames ac. Ultricies leo
          integer malesuada nunc vel risus commodo viverra maecenas. Nunc congue
          nisi vitae suscipit tellus mauris a diam maecenas. Dui accumsan sit
          amet nulla facilisi morbi tempus.
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
