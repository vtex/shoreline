import React from 'react'
import type { Meta } from '@storybook/react'

import { Box } from '../../Box'
import { Button } from '../../button'
import {
  Modal,
  ModalDisclosure,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useModalState,
} from '../index'
import { Text } from '../../Text'
import { Checkbox, useCheckboxState } from '../../Checkbox'
import { Heading } from '../../Heading'
import { Paragraph } from '../../Paragraph'
import { Label } from '../../Label'

export default {
  title: 'admin-ui/Modal',
  component: Modal,
} as Meta

export function Dialog() {
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button>Publish</Button>
      </ModalDisclosure>
      <Modal aria-label="Publish modal" state={modal} size="small">
        <ModalHeader title="Publish content" />
        <ModalContent>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}

export function Small() {
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button>News</Button>
      </ModalDisclosure>
      <Modal aria-label="News modal" state={modal} size="small">
        <ModalHeader title="We have good news!" />
        <ModalContent>
          <Text>
            This is our new experience for inventory update. Feel free to leave
            feedback.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button>Okay, got it</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}

export function InitallyVisible() {
  const modal = useModalState({
    visible: true,
  })

  return (
    <Box>
      <Modal aria-label="News modal" state={modal} size="small">
        <ModalHeader title="Initially Visible" />
        <ModalContent>
          <Text>
            This is our new experience for inventory update. Feel free to leave
            feedback.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button>Okay, got it</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}

export function Regular() {
  const modal = useModalState()
  const checkbox = useCheckboxState()

  const handleClose = () => checkbox.setState(false)

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button>Regular</Button>
      </ModalDisclosure>
      <Modal
        state={modal}
        aria-label="Conditions Modal"
        size="regular"
        onClose={handleClose}
      >
        <ModalHeader title="Terms and Conditions" />
        <ModalContent>
          <Heading>Shared Cart</Heading>
          <Paragraph>
            The shared cart is a tool that allows more than one customer to add,
            remove or update items and informations from the same cart. For your
            customer, the shared cart means practicality when making a purchase.
            For your store, it means:
          </Paragraph>
          <Heading as="h2">Information security</Heading>
          <Paragraph>
            The payment is still done by one person whose informations remain
            secure, since the profile and delivery data are visible only to the
            user who creates the cart. For others, these same data are
          </Paragraph>

          <Heading as="h2">How this is technically possible</Heading>
          <Paragraph>
            We started using a parameter in the URL to identify the cart. As a
            result, the URL can be shared with other users, who can view the
            items, add and remove products, and even pay for the order. However,
            for users already registered in the platform (whose data is filled
            automatically in the checkout), all personal informations are
            secure: only the informations owner has access to them, after he is
            authenticated in the store.
          </Paragraph>
        </ModalContent>
        <ModalFooter>
          <Label
            csx={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <Checkbox state={checkbox} />
            <Text csx={{ paddingLeft: 2 }}>
              I accept the terms and conditions above
            </Text>
          </Label>
          <Button disabled={!checkbox.state}>Next</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}
