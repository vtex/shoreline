import React, { Fragment } from 'react'
import { Meta } from '@storybook/react'

import { Checkbox, useCheckbox } from '../Checkbox'
import { Label } from '../Label'
import { Button } from '../Button'
import { ModalDisclosure, Modal, useModalState } from './index'
import { Text } from '../Text'

export default {
  title: 'alpha/Modal',
  component: Modal,
} as Meta

export const Stateless = () => {
  const checkbox = useCheckbox()
  const publishModal = useModalState()
  const conditionsModal = useModalState()

  return (
    <Fragment>
      <ModalDisclosure {...publishModal}>
        <Button>Publish</Button>
      </ModalDisclosure>
      {/* <Modal state={publishModal} size="small">
        <Modal.Header title="Publish content" hide={publishModal.hide} />
        <Modal.Content>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Button sx={{ width: 'full', mr: 9 }} variant="subtle">
            Cancel
          </Button>
          <Button sx={{ width: 'full' }}>Confirm</Button>
        </Modal.Footer>
      </Modal> */}

      <Modal state={publishModal} size="small">
        <Modal.Header title="Publish content" hide={publishModal.hide} />
        <Modal.Content>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </Modal.Content>
        <Modal.Footer
          sx={{
            button: {
              width: 'full',
            },
          }}
        >
          <Button sx={{ width: 'full' }}>Okay, got it</Button>
        </Modal.Footer>
      </Modal>

      <ModalDisclosure {...conditionsModal}>
        <Button>Regular</Button>
      </ModalDisclosure>
      <Modal state={conditionsModal} size="regular">
        <Modal.Header
          title="Terms and Conditions"
          hide={() => {
            conditionsModal.hide()
            checkbox.setState(false)
          }}
        />
        <Modal.Content>
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
        </Modal.Content>
        <Modal.Footer>
          <Label display="flex" position="relative" items="center">
            <Checkbox {...checkbox} />I accept the terms and conditions above.
          </Label>
          <Button disabled={!checkbox.state}>Next</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
