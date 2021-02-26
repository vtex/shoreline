import React, { useState } from 'react'
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
import { CornerScope } from './utils'
import { SidebarSubItem } from './components/SubItem'

export default {
  title: 'shell/Sidebar',
  component: Sidebar,
} as Meta

interface PlaygroundArgs extends SidebarProps {
  id: string
}

interface ItemCursor {
  index: number
  scope: CornerScope
}

const iconProps: IconProps = {}

type ItemProps = Omit<SidebarItemProps, 'secret'>[]

const topCornerItems: ItemProps = [
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
    subItems: {
      children: [
        <SidebarSubItem onClick={() => console.log('Click me')}>
          All promotions
        </SidebarSubItem>,
        <SidebarSubItem onClick={() => console.log('Click me')}>
          Coupons
        </SidebarSubItem>,
        <SidebarSubItem onClick={() => console.log('Click me')}>
          Campaign Audience
        </SidebarSubItem>,
        <SidebarSubItem onClick={() => console.log('Click me')}>
          Gift Cards
        </SidebarSubItem>,
        <SidebarSubItem onClick={() => console.log('Click me')}>
          Taxes
        </SidebarSubItem>,
      ],
    },
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

const bottomCornerItems: ItemProps = [
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
  const [currentItem, setCurrentItem] = useState<ItemCursor>({
    index: 0,
    scope: 'top',
  })

  return (
    <Box
      styles={{
        width: 800,
        height: 'calc(100vh - 2rem)',
      }}
    >
      <Sidebar {...args}>
        <Sidebar.Header>
          {topCornerItems.map((props, index) => (
            <Sidebar.Item
              {...props}
              selected={
                currentItem.scope === 'top' && currentItem.index === index
              }
              onClick={() => setCurrentItem({ index, scope: 'top' })}
            />
          ))}
        </Sidebar.Header>
        <Sidebar.Footer>
          {bottomCornerItems.map((props, index) => (
            <Sidebar.Item
              {...props}
              selected={
                currentItem.scope === 'bottom' && currentItem.index === index
              }
              onClick={() => setCurrentItem({ index, scope: 'bottom' })}
            />
          ))}
        </Sidebar.Footer>
      </Sidebar>
    </Box>
  )
}

Playground.args = {
  id: 'Sidebar',
}
