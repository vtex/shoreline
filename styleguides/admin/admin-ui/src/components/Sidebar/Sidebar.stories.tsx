import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Sidebar, SidebarProps } from './index'
import { Box } from '../Box'
import { SidebarItemProps } from './components/Item'
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

const TopSidebarItems = () => {
  return (
    <Sidebar.TopCorner>
      {topCornerItems.map((props) => (
        <Sidebar.Item {...props} />
      ))}
    </Sidebar.TopCorner>
  )
}

const BottomSidebarItems = () => {
  return (
    <Sidebar.BottomCorner>
      {bottomCornerItems.map((props) => (
        <Sidebar.Item {...props} />
      ))}
    </Sidebar.BottomCorner>
  )
}

export const Playground: Story<PlaygroundArgs> = (args) => {
  args = {
    ...args,
    children: (
      <>
        <TopSidebarItems />
        <BottomSidebarItems />
      </>
    ),
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
