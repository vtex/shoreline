import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Modal } from './index'

export default {
  title: 'beta/Modal',
  component: Modal,
} as Meta

export const Default: Story<> = () => <Modal />
