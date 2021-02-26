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

interface CornerItemProps {
  currentItem: ItemCursor
  setCurrentItem: (item: ItemCursor) => void
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

const TopSidebarItems = ({ currentItem, setCurrentItem }: CornerItemProps) => {
  return (
    <Sidebar.TopCorner>
      {topCornerItems.map((props, index) => (
        <Sidebar.Item
          {...props}
          selected={currentItem.scope === 'top' && currentItem.index === index}
          onClick={() => setCurrentItem({ index, scope: 'top' })}
        />
      ))}
    </Sidebar.TopCorner>
  )
}

const BottomSidebarItems = ({
  currentItem,
  setCurrentItem,
}: CornerItemProps) => {
  return (
    <Sidebar.BottomCorner>
      {bottomCornerItems.map((props, index) => (
        <Sidebar.Item
          {...props}
          selected={
            currentItem.scope === 'bottom' && currentItem.index === index
          }
          onClick={() => setCurrentItem({ index, scope: 'bottom' })}
        />
      ))}
    </Sidebar.BottomCorner>
  )
}

export const Playground: Story<PlaygroundArgs> = (args) => {
  const [currentItem, setCurrentItem] = useState<ItemCursor>({
    index: 0,
    scope: 'top',
  })

  args = {
    ...args,
    children: (
      <>
        <TopSidebarItems
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
        <BottomSidebarItems
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
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
