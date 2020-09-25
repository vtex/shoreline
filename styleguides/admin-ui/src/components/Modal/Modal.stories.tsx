import React from 'react'
import { Meta } from '@storybook/react'

import { Checkbox, useCheckbox } from '../Checkbox'
import { Box } from '../Box'
import { Label } from '../Label'
import { Button } from '../Button'
import { Modal, ModalDisclosure, StatelessModal, useModalState } from './index'
import { Text } from '../Text'

export default {
  title: 'alpha/Modal',
  component: Modal,
} as Meta

export const Stateful = () => (
  <Modal
    aria-label="Publish modal"
    size="small"
    disclosure={<Button>Publish</Button>}
  >
    <Modal.Header>
      <Modal.Title>Publish content</Modal.Title>
    </Modal.Header>
    <Modal.Content>
      <Text>
        Are you sure you want to publish this content? These action cannot be
        undone.
      </Text>
    </Modal.Content>
    <Modal.Footer>
      <Button variant="subtle">Cancel</Button>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal>
)

export const StatefulWithNativeElements = () => (
  <Modal
    aria-label="Publish modal"
    size="small"
    disclosure={<Button>Publish</Button>}
  >
    <header>
      <h1>Publish content</h1>
    </header>
    <section>
      <Text>
        Are you sure you want to publish this content? These action cannot be
        undone.
      </Text>
    </section>
    <footer>
      <Button variant="subtle">Cancel</Button>
      <Button>Confirm</Button>
    </footer>
  </Modal>
)

export const Stateless = () => {
  const checkbox = useCheckbox()
  const publishModal = useModalState()
  const newsModal = useModalState()
  const conditionsModal = useModalState()

  return (
    <Box sx={{ 'button + button': { ml: 8 } }}>
      <ModalDisclosure {...publishModal}>
        <Button>Publish</Button>
      </ModalDisclosure>
      <StatelessModal
        aria-label="Publish modal"
        state={publishModal}
        size="small"
      >
        <header>
          <h1>Publish content</h1>
        </header>
        <section>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </section>
        <footer>
          <Button variant="subtle">Cancel</Button>
          <Button>Confirm</Button>
        </footer>
      </StatelessModal>

      <ModalDisclosure {...newsModal}>
        <Button>News</Button>
      </ModalDisclosure>
      <StatelessModal
        aria-label="News modal"
        state={newsModal}
        size="small"
        hideCloseButton
      >
        <header>
          <h1>We have good news!</h1>
        </header>
        <section>
          <Text>
            This is our new experience for inventory update. Feel free to leave
            feedback.
          </Text>
        </section>
        <footer>
          <Button onClick={() => newsModal.hide()}>Okay, got it</Button>
        </footer>
      </StatelessModal>

      <ModalDisclosure {...conditionsModal}>
        <Button>Regular</Button>
      </ModalDisclosure>
      <StatelessModal
        aria-label="Conditions Modal"
        state={conditionsModal}
        size="regular"
      >
        <header>
          <StatelessModal.Title>Terms and Conditions</StatelessModal.Title>
        </header>
        <section>
          <Text variant="subtitle">Shared Cart</Text>
          <Text>
            The shared cart is a tool that allows more than one customer to add,
            remove or update items and informations from the same cart.
            <br />
            For your customer, the shared cart means practicality when making a
            purchase. For your store, it means:
            <ol>
              <li>Opportunity for a larger sale.</li>
              <li> Lower logistics effort.</li>
              <li>Single order flow. </li>
            </ol>
            <Text variant="subtitle">How this is technically possible</Text>
            We started using a parameter in the URL to identify the cart. As a
            result, the URL can be shared with other users, who can view the
            items, add and remove products, and even pay for the order. However,
            for users already registered in the platform (whose data is filled
            automatically in the checkout), all personal informations are
            secure: only the informations owner has access to them, after he is
            authenticated in the store.
            <Text variant="subtitle">Information security</Text>
            The payment is still done by one person whose informations remain
            secure, since the profile and delivery data are visible only to the
            user who creates the cart. For others, these same data are
          </Text>
        </section>
        <footer>
          <Label display="flex" position="relative" items="center">
            <Checkbox {...checkbox} />I accept the terms and conditions above.
          </Label>
          <Button disabled={!checkbox.state}>Next</Button>
        </footer>
      </StatelessModal>
    </Box>
  )
}
