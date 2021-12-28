import React from 'react'
import type { Story, Meta } from '@storybook/react'
import {
  IconSquaresFour,
  IconHouse,
  IconTreeStructure,
  IconShoppingCartSimple,
  IconTag,
  IconMegaphone,
  IconSlidersHorizontal,
  IconPackage,
  IconLayout,
} from '@vtex/phosphor-icons'

import { Box } from '../../Box'
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarSection,
  SidebarSectionItem,
  useSidebarState,
} from '../index'
import { Paragraph } from '../../Paragraph'

export default {
  title: 'admin-ui/Sidebar',
  component: Sidebar,
} as Meta

const top = [
  {
    icon: <IconHouse />,
    onClick: () => console.log('Click me'),
    label: 'Home',
    sections: [],
  },
  {
    icon: <IconShoppingCartSimple />,
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
    icon: <IconTag />,
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
    icon: <IconMegaphone />,
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
    icon: <IconLayout />,
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
    icon: <IconPackage />,
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
    icon: <IconTreeStructure />,
    onClick: () => console.log('Click me'),
    label: 'Marketplace',
    sections: [],
  },
]

const bottom = [
  {
    icon: <IconSquaresFour />,
    onClick: () => console.log('Click me'),
    label: 'App Store',
    sections: [],
  },
  {
    icon: <IconSlidersHorizontal />,
    onClick: () => console.log('Click me'),
    label: 'Settings',
    sections: [],
  },
]

export const Playground: Story<any> = (args) => {
  const state = useSidebarState()

  return (
    <Box
      csx={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
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
          <SidebarGroup>
            {top.map((item, index) => (
              <SidebarItem
                label={item.label}
                uniqueKey={item.label}
                icon={item.icon}
                key={item.label}
                selected={index === 0}
              >
                {item.sections.map((section) => (
                  <SidebarSection title={section.title} key={section.title}>
                    {section.subItems.map((label) => (
                      <SidebarSectionItem
                        key={label}
                        onClick={() => console.log(`hey`)}
                      >
                        {label}
                      </SidebarSectionItem>
                    ))}
                  </SidebarSection>
                ))}
              </SidebarItem>
            ))}
          </SidebarGroup>
          <SidebarGroup>
            {bottom.map((item) => (
              <SidebarItem
                icon={item.icon}
                label={item.label}
                uniqueKey={item.label}
                key={item.label}
              />
            ))}
          </SidebarGroup>
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
    </Box>
  )
}

Playground.args = {
  id: 'Sidebar',
  loading: false,
}
