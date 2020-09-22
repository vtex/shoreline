import React, { Fragment, useState } from 'react'
import { Meta } from '@storybook/react'
import { Checkbox, Label } from 'theme-ui'

import { Button } from '../Button'
import { Disclosure, Modal, useModalState } from './index'
import { Text } from '../Text'

export default {
  title: 'alpha/Modal',
  component: Modal,
} as Meta

export const Basic = () => {
  const [allowNext, setAllowNext] = useState(false)
  const modal = useModalState()

  return (
    <Fragment>
      <Disclosure {...modal}>
        <Button>Large</Button>
      </Disclosure>
      {/* <Modal size="small">
        <Text variant="headline">Build for community</Text>
        <Text>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Text>
      </Modal>
      <Modal>
        <Text variant="headline">Build for community</Text>
        <Text>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Text>
      </Modal> */}
      <Modal state={modal} title="Terms and Conditions" size="regular">
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
          <Label
            sx={{
              position: 'relative',
              width: 'inherit',
              alignItems: 'center',
            }}
          >
            <Checkbox
              checked={allowNext}
              onChange={() => setAllowNext((alnxt) => !alnxt)}
            />
            I accept the terms and conditions above.
          </Label>
          <Button disabled={!allowNext}>Next</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
