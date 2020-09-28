import React, { ReactNode } from 'react'
import { Meta, Story } from '@storybook/react'

import { Checkbox, useCheckbox } from '../Checkbox'
import { Box, BoxProps } from '../Box'
import { Label } from '../Label'
import { Button } from '../Button'
import { Modal, ModalDisclosure, StatelessModal, useModalState } from './index'
import { Text } from '../Text'
import { ModalProps } from './Stateful'
import { Toggle } from '../Toggle'
import { Ballon } from '../../../assets/Ballon'
import { WrappingBox } from '../../../assets/WrappingBox'
import { Stairs } from '../../../assets/Stairs'

export default {
  title: 'beta/Modal',
  component: Modal,
} as Meta

export const Stateful: Story<ModalProps> = () => (
  <Modal
    aria-label="Publish modal"
    size="small"
    disclosure={<Button>Publish</Button>}
  >
    <Modal.Header title="Publish content" />
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

export const Stateless = () => {
  const publishModal = useModalState()

  return (
    <Box>
      <ModalDisclosure {...publishModal}>
        <Button>Publish</Button>
      </ModalDisclosure>
      <StatelessModal
        aria-label="Publish modal"
        state={publishModal}
        size="small"
      >
        <Modal.Header title="Publish content" />
        <Modal.Content>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="subtle">Cancel</Button>
          <Button>Confirm</Button>
        </Modal.Footer>
      </StatelessModal>
    </Box>
  )
}

export const SmallModal: Story<ModalProps> = () => {
  return (
    <Modal
      aria-label="News modal"
      disclosure={<Button>Small</Button>}
      size="small"
    >
      <Modal.Header title="We have good news!" />
      <Modal.Content>
        <Text>
          This is our new experience for inventory update. Feel free to leave
          feedback.
        </Text>
      </Modal.Content>
      <Modal.Footer>
        <Button>Okay, got it</Button>
      </Modal.Footer>
    </Modal>
  )
}

export const RegularModal: Story<ModalProps> = () => {
  const checkbox = useCheckbox()

  return (
    <Modal
      aria-label="Conditions Modal"
      disclosure={<Button>Regular</Button>}
      size="regular"
      onClose={() => checkbox.setState(false)}
    >
      <Modal.Header title="Terms and Conditions" />
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
          automatically in the checkout), all personal informations are secure:
          only the informations owner has access to them, after he is
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
  )
}

export const LargeModal: Story<ModalProps> = () => {
  interface ListProps {
    title?: string
    children: ReactNode
  }

  function List(props: ListProps) {
    return (
      <Modal.Content>
        {props.title && <Text variant="subtitle">{props.title}</Text>}
        {props.children}
      </Modal.Content>
    )
  }

  List.Item = function ListItem(props: BoxProps) {
    return (
      <Box
        display="flex"
        w="full"
        justify="between"
        py="9"
        bbc="muted.3"
        bbw="1"
        bbs="solid"
        {...props}
      />
    )
  }

  return (
    <Box sx={{ 'button + button': { ml: 5 } }}>
      <Modal
        aria-label="Transactions Modal"
        disclosure={<Button>Transactions settings</Button>}
        size="large"
      >
        <Modal.Header title="Transactions settings">
          <Modal.Button variant="subtle" size="small" closeModalOnClick>
            Cancel
          </Modal.Button>
          <Modal.Button closeModalOnClick size="small">
            Save Changes
          </Modal.Button>
        </Modal.Header>
        <List title="General">
          <List.Item>
            <Text>Default markup for external integration</Text>
            <Text c="muted.1">100%</Text>
          </List.Item>
          <List.Item>
            <Text>Use price variation limit</Text>
            <Toggle state />
          </List.Item>
          <List.Item>
            <Text>Inherit prices from parent account</Text>
            <Toggle state />
          </List.Item>
          <List.Item>
            <Text>Overwrite seller prices</Text>
            <Toggle state />
          </List.Item>
        </List>
        <List title="Psychological pricing">
          <List.Item>
            <Box>
              <Text>Apply this method to all prices</Text>
              <br />
              <Text c="muted.1">Inactive</Text>
            </Box>
            <Toggle state />
          </List.Item>
          <List.Item>
            <Text>At what price range will this rule apply?</Text>
            <Text c="muted.1">From 9.90 to 20.00</Text>
          </List.Item>
          <List.Item>
            <Text>How many digits will be rounded?</Text>
            <Text c="muted.1">2</Text>
          </List.Item>
          <List.Item>
            <Text>Which rounding method will be applied to?</Text>
            <Text c="muted.1">Nines</Text>
          </List.Item>
        </List>
      </Modal>

      <Modal
        aria-label="Announcements Modal"
        disclosure={<Button>Announcements</Button>}
        size="large"
      >
        <Modal.Header title="Announcements" />
        <List>
          <List.Item>
            <Ballon />
            <Box w="2/3">
              <Text variant="subtitle">
                Received SKUs: Bulk approval
                <br />
                <Text c="muted.1" variant="small">
                  July 4, 2020
                </Text>
              </Text>
              <Text el="p">
                Marketplaces manage their sellers products from the Received
                SKUs dashboard, where you can review and approve products sent
                by sellers. On the dashboard, you can bulk select SKUs,
                approving, or rejecting items all at once.
              </Text>
            </Box>
          </List.Item>
          <List.Item>
            <WrappingBox />
            <Box w="2/3">
              <Text variant="subtitle">
                B2B: Segment prices directly in the purchase flow using our new
                Order Configuration app.
                <br />
                <Text c="muted.1" variant="small">
                  July 4, 2020
                </Text>
              </Text>
              <Text el="p">
                A critical part of a B2B operation is the segmentation of prices
                and rates according to the buying company profile. The rules
                change from store to store, but factors such as the buyers
                location, type of order and payment method.
              </Text>
            </Box>
          </List.Item>
          <List.Item>
            <Stairs />
            <Box w="2/3">
              <Text variant="subtitle">
                Samsung Pay: more flexible payments thanks to the new digital
                wallet
                <br />
                <Text c="muted.1" variant="small">
                  July 4, 2020
                </Text>
              </Text>
              <Text el="p">
                Marketplaces manage their sellers products from the Received
                SKUs dashboard, where you can review and approve products sent
                by sellers. On the dashboard, you can bulk select SKUs,
                approving, or rejecting items all at once.
              </Text>
            </Box>
          </List.Item>
        </List>
      </Modal>
    </Box>
  )
}
