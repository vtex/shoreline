import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Sidebar, SidebarProps, useSidebarState } from './index'
import { Box } from '@vtex/admin-primitives'
import { Paragraph } from '../Paragraph'
import {
  IconAppStore,
  IconHome,
  IconMarketplace,
  IconOrders,
  IconProducts,
  IconPromotions,
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

export const top = [
  {
    icon: <IconHome />,
    onClick: () => console.log('Click me'),
    label: 'Home',
    sections: [],
  },
  {
    icon: <IconOrders />,
    onClick: () => console.log('Click me'),
    label: 'Orders',
    sections: [
      {
        title: 'Orders',
        subItems: [
          'All Orders',
          'Subscriptions Super Long Text',
          'Transactions',
          'Bank Conciliation Super Long Text',
        ],
      },
    ],
  },
  {
    icon: <IconProducts />,
    onClick: () => console.log('Click me'),
    label: 'Products',
    sections: [
      {
        title: 'Discounts',
        subItems: [
          'All Products',
          'Categories',
          'Brands',
          'Collections',
          'List Types',
          'Inventory',
          'Custom Fields Supor Long Text',
          'Import and Export Super Long Text',
          'Reviews',
          'Reports',
        ],
      },
      { title: 'Prices', subItems: ['Price List', 'Price Rules'] },
    ],
  },
  {
    icon: <IconPromotions />,
    onClick: () => console.log('Click me'),
    label: 'Promotions',
    sections: [
      {
        title: 'Promotions',
        subItems: [
          'All Promotions',
          'Coupons',
          'Campaign Audience Super Long Text',
          'Gift Cards',
          'Taxes',
        ],
      },
    ],
  },
  {
    icon: <IconStorefront />,
    onClick: () => console.log('Click me'),
    label: 'Storefront',
    sections: [
      {
        subItems: ['Layout', 'Site Editor', 'Pages', 'Styles', 'Banners'],
        title: 'Intelligent Search',
      },
    ],
  },
  {
    icon: <IconShipping />,
    onClick: () => console.log('Click me'),
    label: 'Shipping',
    sections: [
      {
        title: 'Shipping',
        subItems: [
          'Shipping Rates',
          'Shipping Simulator',
          'Pickup Points Super Long Text',
          'Shipping Strategy',
        ],
      },
    ],
  },
  {
    icon: <IconMarketplace />,
    onClick: () => console.log('Click me'),
    label: 'Marketplace',
    sections: [],
  },
]

export const bottom = [
  {
    icon: <IconAppStore />,
    onClick: () => console.log('Click me'),
    label: 'App Store',
    sections: [],
  },
  {
    icon: <IconSettings />,
    onClick: () => console.log('Click me'),
    label: 'Settings',
    sections: [],
  },
]

export const Playground: Story<PlaygroundArgs> = (args) => {
  const state = useSidebarState()

  return (
    <>
      <Box
        csx={{
          height: 30,
          padding: 22,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '4px dashed black',
          margin: 1,
        }}
      >
        TOP BAR
      </Box>
      <Box
        csx={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100vh - 92px)',
          overflow: 'hidden',
        }}
      >
        <Sidebar {...args} state={state}>
          <Sidebar.Top>
            {top.map((item) => (
              <Sidebar.Item
                label={item.label}
                uniqueKey={item.label}
                icon={item.icon}
                key={item.label}
              >
                {item.sections.map((section) => (
                  <Sidebar.Item.Section
                    title={section.title}
                    key={section.title}
                  >
                    {section.subItems.map((label) => (
                      <Sidebar.Item.Section.Item
                        key={label}
                        onClick={() => console.log(`hey`)}
                      >
                        {label}
                      </Sidebar.Item.Section.Item>
                    ))}
                  </Sidebar.Item.Section>
                ))}
              </Sidebar.Item>
            ))}
          </Sidebar.Top>
          <Sidebar.Bottom>
            {bottom.map((item) => (
              <Sidebar.Item
                icon={item.icon}
                label={item.label}
                uniqueKey={item.label}
                key={item.label}
              />
            ))}
          </Sidebar.Bottom>
        </Sidebar>
        <Box
          csx={{
            width: '100%',
            height: 'auto',
            padding: 22,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '4px dashed black',
            margin: 1,
          }}
        >
          <Paragraph>APPS</Paragraph>
        </Box>
      </Box>
    </>
  )
}

Playground.args = {
  id: 'Sidebar',
  loading: false,
}
