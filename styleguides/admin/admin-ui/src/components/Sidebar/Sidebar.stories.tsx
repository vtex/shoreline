import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import { Sidebar, SidebarProps } from './index'
import { Box } from '../Box'
import { SidebarItemProps } from './components/Item'
import {
  IconAppStore,
  IconDashboard,
  IconMarketplace,
  IconOrders,
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

const iconProps: IconProps = {}

type ItemProps = Omit<SidebarItemProps, 'secret'>[]

const orders = [
  'All Orders',
  'Subscriptions',
  'Transactions',
  'Bank Conciliation',
]

const promotions = [
  'All Promotions',
  'Coupons',
  'Campaign Audience',
  'Gift Cards',
  'Taxes',
]

const storeFront = [
  'Layout',
  'Site Editor',
  'Pages',
  'Styles',
  'Redirects',
  'Banners',
]

const catalog = [
  'All Products',
  'Categories',
  'Brands',
  'Collections',
  'List Types',
  'Inventory',
  'Custom Fields',
  'Import and Export',
  'Reviews',
  'Reports',
]
const catalog2 = ['Price List', 'Price Rules']

const intelligentSearch = [
  'Explained Search',
  'Merchandising Rules',
  'Synonyms',
  'Indexing Status',
  'Relevance Rules',
  'Analytics',
  'Redirects',
]

const shipping = [
  'Shipping Rates',
  'Shipping Simulator',
  'Pickup Points',
  'Shipping Strategy',
]

const topCornerItems: ItemProps = [
  {
    icon: <IconDashboard {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Dashboard',
  },
  {
    icon: <IconOrders {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Orders',
    sections: [
      {
        title: 'Orders',
        children: orders.map((label) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')}>
            {label}
          </Sidebar.SubItem>
        )),
      },
    ],
  },
  {
    icon: <IconProducts {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Products',
    sections: [
      {
        title: 'Product',
        children: catalog.map((label) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')}>
            {label}
          </Sidebar.SubItem>
        )),
      },
      {
        title: 'Prices',
        children: catalog2.map((label) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')}>
            {label}
          </Sidebar.SubItem>
        )),
      },
    ],
  },
  {
    icon: <IconPromotions {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Promotions',
    sections: [
      {
        title: 'Discounts',
        children: promotions.map((label) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')}>
            {label}
          </Sidebar.SubItem>
        )),
      },
    ],
  },
  {
    icon: <IconStorefront {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Storefront',
    sections: [
      {
        title: 'Content Management',
        children: storeFront.map((label) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')}>
            {label}
          </Sidebar.SubItem>
        )),
      },
      {
        title: 'Intelligent Search',
        children: intelligentSearch.map((label) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')}>
            {label}
          </Sidebar.SubItem>
        )),
      },
    ],
  },
  {
    icon: <IconShipping {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Shipping',
    sections: [
      {
        title: 'Shipping',
        children: shipping.map((label) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')}>
            {label}
          </Sidebar.SubItem>
        )),
      },
    ],
  },
  {
    icon: <IconMarketplace {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Marketplace',
  },
]

const bottomCornerItems: ItemProps = [
  {
    icon: <IconAppStore {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'App Store',
  },
  {
    icon: <IconSettings {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Settings',
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
        margin: '-1rem',
        height: 'calc(100vh + 2rem)',
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
