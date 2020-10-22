import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import styled from '@emotion/styled'

import { Checkbox, useCheckbox } from '../Checkbox'
import { unstableBox as Box } from '../unstableBox'
import { List } from '../List'
import { Label } from '../Label'
import { unstableButton as Button } from '../unstableButton'
import { Modal, ModalDisclosure, StatelessModal, useModalState } from './index'
import { Text } from '../Text'
import { ModalProps } from './Stateful'
import { Toggle } from '../Toggle'
import { Ballon } from '../../../assets/Ballon'
import { WrappingBox } from '../../../assets/WrappingBox'
import { Stairs } from '../../../assets/Stairs'
import {
  IconCarousel,
  IconShelf,
  IconInfoCard,
  IconRichText,
  IconVitrine,
} from '../../../assets/ComponentIcons'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'system-next/modal',
  component: Modal,
} as Meta

export const Stateful: Story<ModalProps> = () => (
  <ThemeProvider>
    <Modal
      aria-label="Publish modal"
      size="small"
      disclosure={<Button>Publish</Button>}
    >
      <Modal.Header title="Publish content" />
      <Modal.Content>
        <Box text="body">
          Are you sure you want to publish this content? These action cannot be
          undone.
        </Box>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="subtle">Cancel</Button>
        <Button>Confirm</Button>
      </Modal.Footer>
    </Modal>
  </ThemeProvider>
)

export const Stateless = () => {
  const publishModal = useModalState({ animated: true })

  return (
    <ThemeProvider>
      <Box>
        <ModalDisclosure state={publishModal}>
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
    </ThemeProvider>
  )
}

export const SmallModal: Story<ModalProps> = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export const RegularModal: Story<ModalProps> = () => {
  const checkbox = useCheckbox()

  const handleClose = () => checkbox.setState(false)

  return (
    <ThemeProvider>
      <Modal
        aria-label="Conditions Modal"
        disclosure={<Button>Regular</Button>}
        size="regular"
        onClose={handleClose}
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
            <Checkbox {...checkbox} />
            <Text pl="2">I accept the terms and conditions above</Text>
          </Label>
          <Button disabled={!checkbox.state}>Next</Button>
        </Modal.Footer>
      </Modal>
    </ThemeProvider>
  )
}

export const LargeModal: Story<ModalProps> = () => {
  return (
    <ThemeProvider>
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
        <Modal.Content>
          <List
            density="compact"
            label="General"
            sx={{
              div: {
                justifyContent: 'space-between',
              },
            }}
          >
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
        </Modal.Content>
        <Modal.Content>
          <List
            density="compact"
            label="Psychological pricing"
            sx={{
              div: {
                justifyContent: 'space-between',
              },
            }}
          >
            <List.Item>
              <List.TextGroup
                variant="body"
                title="Apply this method to all prices"
                subtitle="Inactive"
              />
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
        </Modal.Content>
      </Modal>
    </ThemeProvider>
  )
}

// export const AnnouncementsModal: Story<ModalProps> = () => {
//   const list = [
//     {
//       id: '1',
//       image: Ballon,
//       title: 'Received SKUs: Bulk approval',
//       subtitle: 'July 4, 2020',
//       description: `Marketplaces manage their sellers products from the Received
//     SKUs dashboard, where you can review and approve products sent
//     by sellers. On the dashboard, you can bulk select SKUs,
//     approving, or rejecting items all at once.`,
//     },
//     {
//       id: '2',
//       image: WrappingBox,
//       title: `B2B: Segment prices directly in the purchase flow using our new
//       Order Configuration app`,
//       subtitle: 'July 4, 2020',
//       description: `A critical part of a B2B operation is the segmentation of prices
//       and rates according to the buying company profile. The rules
//       change from store to store, but factors such as the buyers
//       location, type of order and payment method.`,
//     },
//     {
//       id: '3',
//       image: Stairs,
//       title: `Samsung Pay: more flexible payments thanks to the new digital
//       wallet`,
//       subtitle: 'July 4, 2020',
//       description: `Marketplaces manage their sellers products from the Received
//       SKUs dashboard, where you can review and approve products sent
//       by sellers. On the dashboard, you can bulk select SKUs,
//       approving, or rejecting items all at once.`,
//     },
//   ]

//   const Announcement = styled(List.Item)`
//     height: 208px;
//     svg,
//     img {
//       min-width: 240px;
//       max-width: 240px;
//       min-height: 160px;
//       max-height: 160px;
//     }
//   `

//   return (
//     <Modal
//       aria-label="Announcements Modal"
//       disclosure={<Button>Announcements</Button>}
//       size="large"
//     >
//       <Modal.Header title="Announcements" />
//       <List>
//         {list.map(({ id, image: Image, ...info }) => (
//           <Announcement key={id}>
//             <Box px="5" w="full" h="full" display="flex" items="center">
//               <Image />
//               <List.TextGroup ml="4" {...info} descLineCount={3} />
//             </Box>
//           </Announcement>
//         ))}
//       </List>
//     </Modal>
//   )
// }

// export const Programmatically = () => {
//   const [data, setData] = useState<Item[]>([])
//   const ref = useRef({ oneTime: true })
//   const blockModal = useModalState()

//   /**
//    * Simulates a data fetching
//    */
//   const fetchData = async () => {
//     const simulateRequest = (delay: number, value: Item[]): Promise<Item[]> =>
//       new Promise((resolve) => setTimeout(resolve, delay, value))

//     const resolved = await simulateRequest(1000, [
//       { id: '1', icon: IconCarousel, title: 'Carousel' },
//       { id: '2', icon: IconShelf, title: 'Shelf' },
//       { id: '3', icon: IconInfoCard, title: 'Infocard' },
//       { id: '4', icon: IconRichText, title: 'Rich text' },
//       { id: '5', icon: IconVitrine, title: 'Vitrine by Corebiz™' },
//     ])

//     setData(resolved)
//   }

//   useEffect(() => {
//     if (ref.current.oneTime && data.length > 0) {
//       blockModal.show()
//       ref.current.oneTime = false
//     }
//   }, [data, blockModal])

//   return (
//     <Box sx={{ 'button + button': { ml: 4 } }}>
//       <Button onClick={fetchData} disabled={data.length > 0}>
//         Get blocks data
//       </Button>
//       <ModalDisclosure state={blockModal}>
//         <Button disabled={data.length === 0}>Add new block</Button>
//       </ModalDisclosure>
//       <StatelessModal aria-label="Add block modal" state={blockModal}>
//         <StatelessModal.Header title="Add new block" />
//         <StatelessModal.Content sx={{ paddingTop: 0 }}>
//           <List>
//             {data.map(({ id, icon: Icon, title }) => (
//               <List.Item key={id}>
//                 <Icon />
//                 <List.TextGroup
//                   ml="4"
//                   title={title}
//                   subtitle="Short description about the block"
//                 />
//               </List.Item>
//             ))}
//           </List>
//         </StatelessModal.Content>
//       </StatelessModal>
//     </Box>
//   )

//   interface Item {
//     id: string
//     icon: FunctionComponent
//     title: string
//   }
// }
