import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import { Sidebar, SidebarProps } from './index'
import { Box } from '../Box'
import { SidebarItemProps } from './components/SidebarItem'
import {
  IconAppStore,
  IconDashboard,
  IconMarketplace,
  IconProducts,
  IconPromotions,
  IconProps,
  IconSettings,
  IconShipping,
  IconStorefront,
} from '@vtex/admin-ui-icons'

export default {
  title: 'shell/Sidebar',
  component: Sidebar,
} as Meta

interface PlaygroundArgs extends SidebarProps {
  id: string
}

const iconProps: IconProps = {}

const topCornerItems: SidebarItemProps[] = [
  {
    icon: <IconDashboard {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
  {
    icon: <IconProducts {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
  {
    icon: <IconPromotions {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
  {
    icon: <IconStorefront {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
  {
    icon: <IconShipping {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
  {
    icon: <IconMarketplace {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
]

const bottomCornerItems: SidebarItemProps[] = [
  {
    icon: <IconAppStore {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
  {
    icon: <IconSettings {...iconProps} />,
    onClick: () => console.log('Click me'),
  },
]

export const Playground: Story<PlaygroundArgs> = (args) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  args = {
    ...args,
    topCorner: {
      items: topCornerItems,
      currentItemIndex,
    },
    bottomCorner: {
      items: bottomCornerItems,
      currentItemIndex,
    },
    onClick: (itemIndex) => setCurrentItemIndex(itemIndex),
  }

  return (
    <Box
      styles={{
        width: 800,
        height: 'calc(100vh - 2rem)',
      }}
    >
      <Sidebar {...args} />
    </Box>
  )
}

Playground.args = {
  id: 'Sidebar',
}
