import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Box } from '../Box'
import { Checkbox, useCheckboxState } from '../Checkbox'
import { Label } from '../Label'
import { Button } from '../Button'
import {
  Modal,
  ModalDisclosure,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useModalState,
} from './index'
import { Text } from '../Text'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'

export default {
  title: 'admin-ui/Modal',
  component: Modal,
} as Meta

// export const Playground: Story<ModalProps> = (args) => (
//   <Modal {...args} disclosure={<Button>Publish</Button>}>
//     <Modal.Header title="Publish content" />
//     <Modal.Content>
//       <Box csx={{ text: 'body' }}>
//         Are you sure you want to publish this content? These action cannot be
//         undone.
//       </Box>
//     </Modal.Content>
//     <Modal.Footer>
//       <Button variant="secondary">Cancel</Button>
//       <Button>Confirm</Button>
//     </Modal.Footer>
//   </Modal>
// )

// Playground.args = {
//   'aria-label': 'Publish modal',
// }

export const Stateless = () => {
  const publishModal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={publishModal}>
        <Button>Publish</Button>
      </ModalDisclosure>
      <Modal aria-label="Publish modal" state={publishModal} size="small">
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

// export const SmallModal: Story<ModalProps> = () => {
//   return (
//     <Modal
//       aria-label="News modal"
//       disclosure={<Button>Small</Button>}
//       size="small"
//     >
//       <Modal.Header title="We have good news!" />
//       <Modal.Content>
//         <Text>
//           This is our new experience for inventory update. Feel free to leave
//           feedback.
//         </Text>
//       </Modal.Content>
//       <Modal.Footer>
//         <Button>Okay, got it</Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }

// export const RegularModal: Story<ModalProps> = () => {
//   const checkbox = useCheckboxState()

//   const handleClose = () => checkbox.setState(false)

//   return (
//     <Modal
//       aria-label="Conditions Modal"
//       disclosure={<Button>Regular</Button>}
//       size="regular"
//       onClose={handleClose}
//     >
//       <Modal.Header title="Terms and Conditions" />
//       <Modal.Content>
//         <Heading>Shared Cart</Heading>
//         <Paragraph>
//           The shared cart is a tool that allows more than one customer to add,
//           remove or update items and informations from the same cart. For your
//           customer, the shared cart means practicality when making a purchase.
//           For your store, it means:
//         </Paragraph>
//         <Heading as="h2">Information security</Heading>
//         <Paragraph>
//           The payment is still done by one person whose informations remain
//           secure, since the profile and delivery data are visible only to the
//           user who creates the cart. For others, these same data are
//         </Paragraph>

//         <Heading as="h2">How this is technically possible</Heading>
//         <Paragraph>
//           We started using a parameter in the URL to identify the cart. As a
//           result, the URL can be shared with other users, who can view the
//           items, add and remove products, and even pay for the order. However,
//           for users already registered in the platform (whose data is filled
//           automatically in the checkout), all personal informations are secure:
//           only the informations owner has access to them, after he is
//           authenticated in the store.
//         </Paragraph>
//       </Modal.Content>
//       <Modal.Footer>
//         <Label
//           csx={{
//             display: 'flex',
//             position: 'relative',
//             alignItems: 'center',
//           }}
//         >
//           <Checkbox state={checkbox} />
//           <Text csx={{ paddingLeft: 2 }}>
//             I accept the terms and conditions above
//           </Text>
//         </Label>
//         <Button disabled={!checkbox.state}>Next</Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }
