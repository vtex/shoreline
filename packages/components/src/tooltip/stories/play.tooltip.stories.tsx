import React from 'react'
import { IconInfo } from '@vtex/shoreline-icons'

import { Tooltip } from '../index'
import { IconButton } from '../../icon-button'

export default {
  title: 'play/tooltip',
  argTypes: {
    label: {
      control: 'text',
    },
    timeout: {
      control: 'number',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
    },
  },
  args: {
    label: 'Tooltip text',
    timeout: 500,
    placement: 'top',
  },
}

export function Playground(args: any) {
  return (
    <Tooltip {...args}>
      <IconButton label="info">
        <IconInfo />
      </IconButton>
    </Tooltip>
  )
}
