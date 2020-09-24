import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Tooltip, TooltipProps } from './index'
import { Button } from '../Button'
import { IconAddChannel } from '../../icons'

export default {
  title: 'beta/Tooltip',
  component: Tooltip,
} as Meta

export const Basic: Story<TooltipProps> = () => (
  <Tooltip placement="right" label="Add new channel">
    <Button icon={<IconAddChannel />} variant="text" />
  </Tooltip>
)
