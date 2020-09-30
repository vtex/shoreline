import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
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
        <StatelessModal.Header title="Publish content" />
        <StatelessModal.Content>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </StatelessModal.Content>
        <StatelessModal.Footer>
          <Button variant="subtle">Cancel</Button>
          <Button>Confirm</Button>
        </StatelessModal.Footer>
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
          <Checkbox {...checkbox} />
          <Text pl="2">I accept the terms and conditions above</Text>
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
        items="center"
        py="4"
        bbc="muted.3"
        bbw="1"
        bbs="solid"
        {...props}
      />
    )
  }

  return (
    <Box sx={{ 'button + button': { ml: 2 } }}>
      <Modal
        aria-label="Transactions Modal"
        disclosure={<Button>Transactions settings</Button>}
        size="large"
        omitCloseButton
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
            <Box pl="2" w="2/3">
              <Text variant="subtitle" sx={{ lineHeight: 1.5 }}>
                Received SKUs: Bulk approval
                <br />
                <Text c="muted.1" variant="small">
                  July 4, 2020
                </Text>
              </Text>
              <Text
                sx={{
                  display: 'block',
                  lineHeight: 1.5,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxHeight: '4.5em',
                }}
                el="p"
              >
                Marketplaces manage their sellers products from the Received
                SKUs dashboard, where you can review and approve products sent
                by sellers. On the dashboard, you can bulk select SKUs,
                approving, or rejecting items all at once.
              </Text>
            </Box>
          </List.Item>
          <List.Item>
            <WrappingBox />
            <Box pl="2" w="2/3">
              <Text variant="subtitle" sx={{ lineHeight: 1.5 }}>
                B2B: Segment prices directly in the purchase flow using our new
                Order Configuration app.
                <br />
                <Text c="muted.1" variant="small">
                  July 4, 2020
                </Text>
              </Text>
              <Text
                el="p"
                sx={{
                  display: 'block',
                  lineHeight: 1.5,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxHeight: '4.5em',
                }}
              >
                A critical part of a B2B operation is the segmentation of prices
                and rates according to the buying company profile. The rules
                change from store to store, but factors such as the buyers
                location, type of order and payment method.
              </Text>
            </Box>
          </List.Item>
          <List.Item>
            <Stairs />
            <Box pl="2" w="2/3">
              <Text variant="subtitle" sx={{ lineHeight: 1.5 }}>
                Samsung Pay: more flexible payments thanks to the new digital
                wallet
                <br />
                <Text c="muted.1" variant="small">
                  July 4, 2020
                </Text>
              </Text>
              <Text
                sx={{
                  display: 'block',
                  lineHeight: 1.5,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxHeight: '4.5em',
                }}
                el="p"
              >
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

export const Programmatically = () => {
  const [data, setData] = useState<Item[]>([])
  const ref = useRef({ oneTime: true })
  const blockModal = useModalState()

  /**
   * Simulates a data fetching
   */
  const fetchData = async () => {
    const simulateRequest = (delay: number, value: Item[]): Promise<Item[]> =>
      new Promise((resolve) => setTimeout(resolve, delay, value))

    const resolved = await simulateRequest(1000, [
      { id: '1', icon: IconCarousel, title: 'Carousel' },
      { id: '2', icon: IconShelf, title: 'Shelf' },
      { id: '3', icon: IconInfoCard, title: 'Infocard' },
      { id: '4', icon: IconRichText, title: 'Rich text' },
      { id: '5', icon: IconVitrine, title: 'Vitrine by Corebiz™' },
    ])

    setData(resolved)
  }

  useEffect(() => {
    if (ref.current.oneTime && data.length > 0) {
      blockModal.show()
      ref.current.oneTime = false
    }
  }, [data, blockModal])

  return (
    <Box sx={{ 'button + button': { ml: 4 } }}>
      <Button onClick={fetchData} disabled={data.length > 0}>
        Get blocks data
      </Button>
      <ModalDisclosure {...blockModal}>
        <Button disabled={data.length === 0}>Add new block</Button>
      </ModalDisclosure>
      <StatelessModal aria-label="Add block modal" state={blockModal}>
        <StatelessModal.Header title="Add new block" />
        <StatelessModal.Content>
          {data.map(({ id, icon: Icon, title }) => (
            <Box
              display="flex"
              w="full"
              items="center"
              bbc="muted.3"
              bbw="1"
              py="4"
              bbs="solid"
              key={id}
            >
              <Icon />
              <Box pl="4">
                <Text sx={{ lineHeight: 'inherit', fontSize: 2 }}>
                  {title}
                  <br />
                  <Text c="muted.1" variant="small">
                    Short description about the block
                  </Text>
                </Text>
              </Box>
            </Box>
          ))}
        </StatelessModal.Content>
      </StatelessModal>
    </Box>
  )

  interface Item {
    id: string
    icon: FunctionComponent
    title: string
  }
}

function IconCarousel() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="3" fill="#DBE9FD" />
      <rect
        opacity="0.1"
        x="10.5"
        y="16.5"
        width="27"
        height="22.5"
        rx="2"
        fill="#134CD8"
      />
      <rect x="7.5" y="12" width="33" height="24" rx="2" fill="white" />
      <path d="M15 27L12 24L15 21" stroke="#134CD8" strokeLinejoin="round" />
      <path d="M33 27L36 24L33 21" stroke="#134CD8" strokeLinejoin="round" />
      <circle
        r="1.2"
        transform="matrix(-1 0 0 1 19.1999 31.2)"
        fill="#134CD8"
      />
      <circle r="1.2" transform="matrix(-1 0 0 1 24 31.2)" fill="#134CD8" />
      <circle r="1.2" transform="matrix(-1 0 0 1 28.8 31.2)" fill="#134CD8" />
    </svg>
  )
}

function IconShelf() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="3" fill="#DBE9FD" />
      <rect
        opacity="0.1"
        x="16.5"
        y="16.5"
        width="15"
        height="22.5"
        rx="2"
        fill="#134CD8"
      />
      <rect x="15" y="12" width="18" height="24" rx="2" fill="white" />
      <path d="M9 27L6 24L9 21" stroke="#134CD8" strokeLinejoin="round" />
      <path d="M39 27L42 24L39 21" stroke="#134CD8" strokeLinejoin="round" />
      <rect x="18" y="30" width="12" height="3" rx="1" fill="#134CD8" />
    </svg>
  )
}

function IconInfoCard() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="3" fill="#DBE9FD" />
      <rect
        opacity="0.1"
        x="10.5"
        y="16.5"
        width="27"
        height="22.5"
        rx="2"
        fill="#134CD8"
      />
      <rect x="7.5" y="12" width="33" height="24" rx="2" fill="white" />
      <path
        d="M21 15H36C36.8284 15 37.5 15.6716 37.5 16.5V31.5C37.5 32.3284 36.8284 33 36 33H21V15Z"
        fill="#DBE9FD"
      />
      <rect x="10.5" y="28.5" width="7.5" height="3" rx="1" fill="#134CD8" />
    </svg>
  )
}

function IconRichText() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="3" fill="#DBE9FD" />
      <rect
        opacity="0.1"
        x="12"
        y="21"
        width="24"
        height="20"
        rx="2"
        fill="#134CD8"
      />
      <rect x="10" y="10" width="28" height="28" rx="2" fill="white" />
      <path
        d="M27.3828 21.8203L27.1562 20.3203C27.1406 20.237 27.1094 20.1719 27.0625 20.125C27.0208 20.0729 26.9635 20.0469 26.8906 20.0469H24.6016V28.8984C24.6016 28.9766 24.6276 29.0521 24.6797 29.125C24.737 29.1979 24.8229 29.2396 24.9375 29.25L25.9609 29.3125V30H21.625V29.3125L22.6484 29.25C22.763 29.2396 22.8464 29.1979 22.8984 29.125C22.9557 29.0521 22.9844 28.9766 22.9844 28.8984V20.0469H20.6797C20.6068 20.0469 20.5443 20.0729 20.4922 20.125C20.4453 20.1719 20.4167 20.237 20.4062 20.3203L20.1875 21.8203H19.2578V19.2656H28.3281V21.8203H27.3828Z"
        fill="#134CD8"
      />
    </svg>
  )
}

function IconVitrine() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="3" fill="#DBE9FD" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3713 13.5C19.1724 13.5 18.9816 13.579 18.841 13.7197L14.5607 18H28.9662C29.0253 17.9231 29.0897 17.8497 29.159 17.7803L33.4393 13.5H19.3713ZM28.5 19.5H13.5V33.75C13.5 34.1642 13.8358 34.5 14.25 34.5H28.5V19.5ZM34.2803 29.159L30 33.4393V19.3713C30 19.1724 30.079 18.9816 30.2197 18.841L34.5 14.5606V28.6287C34.5 28.8276 34.421 29.0184 34.2803 29.159ZM17.7803 12.659C18.2023 12.2371 18.7746 12 19.3713 12H33.75C34.9926 12 36 13.0074 36 14.25V28.6287C36 29.2254 35.7629 29.7977 35.341 30.2197L30.2197 35.341C29.7977 35.7629 29.2254 36 28.6287 36H14.25C13.0074 36 12 34.9926 12 33.75V19.3713C12 18.7746 12.2371 18.2023 12.659 17.7803L17.7803 12.659Z"
        fill="white"
      />
    </svg>
  )
}
