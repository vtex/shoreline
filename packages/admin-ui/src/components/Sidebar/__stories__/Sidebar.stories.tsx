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
  IconArrowUp,
  IconQuestion,
  IconImage,
  IconBell,
  IconArrowUUpLeft,
} from '@vtex/phosphor-icons'
import { Topbar, TopbarStart, TopbarEnd } from '../../Topbar'
import { Box } from '../../Box'
import { Set } from '../../Set'
import { Button } from '../../Button'
import { Text } from '../../Text'
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarSection,
  SidebarSectionItem,
  useSidebarState,
} from '../index'

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
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
      }}
      data-testid="container-shell"
    >
      <Topbar>
        <TopbarStart>
          <Set spacing={3}>
            <Button variant="adaptative-dark" icon={<IconImage />} />
            <Text variant="action1">dpsppinheiros</Text>
          </Set>
        </TopbarStart>
        <TopbarEnd>
          <Set spacing={0}>
            <Button variant="tertiary" icon={<IconArrowUUpLeft />}>
              Switch to previous version
            </Button>
            <Button
              variant="tertiary"
              icon={<IconArrowUp csx={{ transform: `rotate(45deg)` }} />}
            >
              View Store
            </Button>
            <Button variant="tertiary" icon={<IconBell />} />
            <Button variant="tertiary" icon={<IconQuestion />} />
          </Set>
        </TopbarEnd>
      </Topbar>
      <Box
        csx={{
          display: 'flex',
          flexDirection: 'row',
          height: 'auto',
          minHeight: 'calc(100vh - 3.5rem)',
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
                onMouseEnter={() => {
                  console.log('heyyyyy')
                }}
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
              <a href="https://www.google.com.br">
                <SidebarItem
                  icon={item.icon}
                  label={item.label}
                  uniqueKey={item.label}
                  key={item.label}
                />
              </a>
            ))}
          </SidebarGroup>
        </Sidebar>
      </Box>
    </Box>
  )
}

Playground.args = {
  id: 'Sidebar',
  loading: false,
}
