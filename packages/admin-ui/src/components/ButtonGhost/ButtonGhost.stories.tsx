import React, { useState } from 'react'
import type { Story, Meta } from '@storybook/react'
import { IconAppStore, IconAdd } from '@vtex/admin-ui-icons'

import type { ButtonGhostProps } from './index'
import { ButtonGhost } from './index'
import { Set } from '../Set'

export default {
  title: 'admin-ui/ButtonGhost',
  component: ButtonGhost,
} as Meta

export const Playground: Story<ButtonGhostProps> = (args) => {
  return <ButtonGhost {...args} />
}

Playground.args = {
  children: 'Button Ghost',
  csx: {},
}

export const Size: Story = () => {
  return (
    <Set>
      <ButtonGhost>Regular Button</ButtonGhost>
      <ButtonGhost size="small">Small Button</ButtonGhost>
    </Set>
  )
}

export const WithIcon: Story = () => {
  return (
    <Set>
      <ButtonGhost icon={<IconAppStore />}>Icon Start</ButtonGhost>
      <ButtonGhost icon={<IconAppStore />} iconPosition="end">
        IconEnd
      </ButtonGhost>
      <ButtonGhost icon={<IconAppStore title="Icon only" />} />
    </Set>
  )
}

export const Loading = () => {
  const [loading, setLoading] = useState(false)

  return (
    <ButtonGhost
      icon={<IconAdd />}
      loading={loading}
      onClick={() => setLoading(!loading)}
    >
      Loading
    </ButtonGhost>
  )
}
