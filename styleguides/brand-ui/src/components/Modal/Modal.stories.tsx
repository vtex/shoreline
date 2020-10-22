import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Modal, ModalProps } from './index'
import { Button } from '../Button'

export default {
  title: 'beta/Modal',
  component: Modal,
} as Meta

const onConfirmFunc = () => {}

const Template: Story<ModalProps> = ({
  children,
  title,
  onConfirm,
  confirmLabel,
  ...args
}) => (
  <Modal
    title={title}
    {...args}
    disclosure={<Button>Open Modal</Button>}
    confirmLabel={confirmLabel}
    onConfirm={onConfirm}
  >
    {children}
  </Modal>
)

export const SimpleUsage = Template.bind({})
SimpleUsage.args = {
  title: 'Betty',
  children:
    'But if I just showed up at your party, would you have me? Would you want me?',
  confirmLabel: 'Accept',
  onConfirm: onConfirmFunc,
}
