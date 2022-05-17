import React from 'react'
import type { Story, Meta } from '@storybook/react'
import { IconX } from '@vtex/phosphor-icons'

import type { ButtonProps } from './index'
import { Button } from './index'
import { Heading } from '../components/Heading'
import { Box } from '../box'
import { Flex } from '../components/Flex'

export default {
  title: 'admin-ui-review/button',
  component: Button,
  argTypes: {
    variant: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'critical',
        'criticalSecondary',
        'criticalTertiary',
        'neutralTertiary',
      ],
      control: { type: 'radio' },
    },
    size: {
      options: ['normal', 'large'],
      control: { type: 'radio' },
    },
    iconPosition: {
      options: ['start', 'end'],
      control: { type: 'radio' },
    },
  },
} as Meta

type StorybookButtonProps = Omit<ButtonProps, 'icon'> & {
  icon: boolean
}

export const Playground: Story<StorybookButtonProps> = (args) => {
  const { icon, ...props } = args

  return <Button icon={icon ? <IconX /> : undefined} {...props} />
}

Playground.args = {
  size: 'normal',
  variant: 'primary',
  icon: false,
  iconPosition: 'start',
  disabled: false,
  loading: false,
  bleedX: false,
  bleedY: false,
  children: 'Button',
  csx: {},
}

export const Bleed: Story<ButtonProps> = (args) => {
  return (
    <Box
      csx={{
        padding: '$m',
        bg: '$secondary',
      }}
    >
      <Box
        csx={{
          bg: '$primary',
        }}
      >
        <Flex align="center" justify="space-between">
          <Heading>Heading</Heading>
          <Button icon={<IconX />} {...args}>
            Button with bleed
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

Bleed.args = {
  bleedX: true,
  bleedY: true,
  size: 'normal',
  variant: 'primary',
  iconPosition: 'start',
  disabled: false,
  loading: false,
}
