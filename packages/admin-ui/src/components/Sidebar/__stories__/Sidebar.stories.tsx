import React from 'react'
import type { Story, Meta } from '@storybook/react'
import {
  IconStack,
  IconChartBar,
  IconShareNetwork,
  IconShoppingCartSimple,
  IconTag,
  IconMegaphone,
  IconGearSix,
  IconCube,
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
    icon: <IconChartBar />,
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
          'Subscriptions',
          'Transactions',
          'Bank Conciliation Long Text',
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
          'Custom Fields',
          'Import and Export Long Text',
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
          'Promotions',
          'Coupons',
          'Campaign Audience Long Text',
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
        subItems: [
          'Layout',
          'Site Editor Long Text',
          'Pages',
          'Styles',
          'Banners',
        ],
        title: 'Intelligent Search',
      },
    ],
  },
  {
    icon: <IconCube />,
    onClick: () => console.log('Click me'),
    label: 'Shipping',
    sections: [
      {
        title: 'Shipping',
        subItems: [
          'Shipping Rates',
          'Shipping Simulator Long Text',
          'Pickup Points',
          'Shipping Strategy',
        ],
      },
    ],
  },
  {
    icon: <IconShareNetwork />,
    onClick: () => console.log('Click me'),
    label: 'Marketplace',
    sections: [],
  },
]

const bottom = [
  {
    icon: <IconStack />,
    onClick: () => console.log('Click me'),
    label: 'App Store',
    sections: [],
  },
  {
    icon: <IconGearSix />,
    onClick: () => console.log('Click me'),
    label: 'Settings',
    sections: [],
  },
]

export const Playground: Story<any> = (args) => {
  const state = useSidebarState()
  const [loading, setLoading] = React.useState(false)

  return (
    <Box
      csx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
      }}
      data-testid="container-shell"
    >
      <Topbar loading={loading}>
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
        <Sidebar {...args} loading={loading} state={state}>
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
                    {section.subItems.map((label, index) => (
                      <SidebarSectionItem key={label} selected={index === 0}>
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
        <Box
          csx={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            flex: 1,
            maxWidth: '100%',
          }}
        >
          <Box
            as="main"
            csx={{
              size: '100%',
              overflow: 'hidden',
              '> div': {
                maxHeight: '100%',
              },
              '> iframe': {
                maxHeight: '100%',
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            role="main"
          >
            <Button onClick={() => setLoading((prev) => !prev)}>
              Toggle Loading
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

Playground.args = {
  id: 'Sidebar',
  loading: false,
}
