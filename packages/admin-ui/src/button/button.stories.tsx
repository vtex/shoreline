import React from 'react'
import type { Story, Meta } from '@storybook/react'
import { IconPlus, IconArrowUpRight } from '@vtex/phosphor-icons'

import type { ButtonProps } from './index'
import { Button } from './index'
import { Set } from '../components/Set'
import { Heading } from '../components/Heading'
import { Box } from '../components/Box'
import { Flex } from '../components/Flex'

export default {
  title: 'admin-ui-review/button',
  component: Button,
} as Meta

const storyArguments = {
  disabled: false,
  loading: false,
}

export const Playground: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}

Playground.args = {
  children: 'Button',
  csx: {},
  ...storyArguments,
}

export const Sizes: Story<ButtonProps> = (args) => {
  return (
    <Set>
      <Button {...args}>Normal</Button>
      <Button size="large" {...args}>
        Large
      </Button>
    </Set>
  )
}

Sizes.args = storyArguments

export const Variants: Story<ButtonProps> = (args) => {
  return (
    <Set>
      <Button {...args}>Primary</Button>
      <Button variant="secondary" {...args}>
        Secondary
      </Button>
      <Button variant="tertiary" {...args}>
        Tertiary
      </Button>
      <Button variant="critical" {...args}>
        Critical
      </Button>
      <Button variant="criticalSecondary" {...args}>
        Critical secondary
      </Button>
      <Button variant="criticalTertiary" {...args}>
        Critical tertiary
      </Button>
      <Button variant="neutralTertiary" {...args}>
        Neutral tertiary
      </Button>
    </Set>
  )
}

Variants.args = storyArguments

export const Icon: Story<ButtonProps> = (args) => {
  return (
    <Set>
      <Button icon={<IconPlus />} {...args}>
        Icon Start
      </Button>
      <Button
        icon={<IconArrowUpRight />}
        iconPosition="end"
        variant="secondary"
        {...args}
      >
        IconEnd
      </Button>
      <Button
        icon={<IconPlus title="Icon only" />}
        variant="tertiary"
        {...args}
      />
    </Set>
  )
}

Icon.args = storyArguments

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
          <Set>
            <Button icon={<IconPlus />} variant="tertiary" {...args}>
              Button with bleed
            </Button>
          </Set>
        </Flex>
      </Box>
    </Box>
  )
}

Bleed.args = {
  bleedX: true,
  bleedY: true,
  ...storyArguments,
}
