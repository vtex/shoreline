import React, { useState } from 'react'

import {
  Modal,
  ModalContent,
  ModalDismiss,
  ModalFooter,
  ModalHeader,
  ModalHeading,
} from '../index'

import './stories.css'
import { Button } from '../../button'
import { Text } from '../../text'

export default {
  title: 'components/modal',
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Modal size',
    },
    heading: {
      control: 'text',
      description: 'Represents the modal heading',
    },
    content: {
      control: 'text',
      description: 'Content to be displayed in the modal',
    },
    withFooter: {
      control: 'boolean',
      description: 'Whether should render modal footer or not',
    },
    cancelText: {
      control: 'text',
      description: 'Modal cancel text',
    },
    confirmText: {
      control: 'text',
      description: 'Modal confirmation text',
    },
  },
  args: {
    size: 'medium',
    heading: 'Modal heading',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla
    posuere sollicitudin aliquam ultrices sagittis orci.`,
    withFooter: true,
    cancelText: 'Close',
    confirmText: 'Ok',
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

interface StoryArgs {
  size: 'small' | 'medium' | 'large'
  content: string
  heading: string
  cancelText: string
  confirmText: string
  withFooter: boolean
}

export function Play(args: StoryArgs) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        size={args.size}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <ModalHeader>
          <ModalHeading>{args.heading}</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Text>{args.content}</Text>
        </ModalContent>
        {args.withFooter && (
          <ModalFooter>
            <Button onClick={() => setOpen(false)} size="large">
              {args.cancelText}
            </Button>
            <Button
              variant="primary"
              onClick={() => setOpen(false)}
              size="large"
            >
              {args.confirmText}
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </>
  )
}
