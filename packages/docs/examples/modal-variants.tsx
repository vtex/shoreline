import { useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDismiss,
  ModalFooter,
  ModalHeader,
  ModalHeading,
  Stack,
  Text,
} from '@vtex/shoreline'

export default function Example() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  return (
    <Stack fluid>
      <Text variant="emphasis">Standard Modal</Text>
      <Button onClick={() => setOpen1(true)}>Open Standard Modal</Button>
      <Modal open={open1} onClose={() => setOpen1(false)}>
        <ModalHeader>
          <ModalHeading>Modal Heading</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Text>This is the modal content area.</Text>
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen1(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen1(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      <Text variant="emphasis">Without Footer</Text>
      <Button onClick={() => setOpen2(true)}>Open Modal Without Footer</Button>
      <Modal open={open2} onClose={() => setOpen2(false)}>
        <ModalHeader>
          <ModalHeading>Simple Modal</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Text>Modal content without a footer section.</Text>
        </ModalContent>
      </Modal>

      <Text variant="emphasis">With Long Content</Text>
      <Button onClick={() => setOpen3(true)}>Open Modal With Scroll</Button>
      <Modal open={open3} onClose={() => setOpen3(false)}>
        <ModalHeader>
          <ModalHeading>Long Content Modal</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Stack>
            <Text>This modal has long content that requires scrolling.</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </Text>
            <Text>Duis aute irure dolor in reprehenderit in voluptate.</Text>
          </Stack>
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen3(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </Stack>
  )
}
