import React from 'react'
import type { Meta, Story } from '@storybook/react'
import type { IconProps } from '@vtex/phosphor-icons'
import { IconQuestion } from '@vtex/phosphor-icons'
import { Box } from '../Box'

export default {
  title: 'admin-ui/Icons',
  component: IconQuestion,
} as Meta

export const Playground: Story<IconProps> = (args) => {
  return (
    <Box>
      <IconQuestion {...args} />
    </Box>
  )
}

Playground.args = {}
