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
  IconBell,
  IconArrowUUpLeft,
} from '@vtex/phosphor-icons'
import { tag } from '@vtex/admin-ui-react'
import { Topbar, TopbarStart, TopbarEnd } from '../../Topbar'
import { Box } from '../../Box'
import { Set } from '../../Set'
import { Button } from '../../../button'
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

function IconVtex() {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.9031 0H4.99468C3.37344 0 2.33528 1.72792 3.09391 3.1644L5.18532 7.13475H1.39384C1.15373 7.13483 0.917713 7.19706 0.70864 7.31544C0.499568 7.43381 0.324531 7.60431 0.200484 7.81041C0.0764359 8.01652 0.00758188 8.25125 0.000591176 8.49186C-0.00639953 8.73248 0.0487094 8.97083 0.160581 9.18382L6.88762 21.9485C7.00621 22.173 7.18359 22.3608 7.40068 22.4918C7.61777 22.6229 7.86637 22.6921 8.11977 22.6921C8.37316 22.6921 8.62176 22.6229 8.83885 22.4918C9.05595 22.3608 9.23332 22.173 9.35191 21.9485L11.1789 18.5005L13.471 22.8508C14.2777 24.3809 16.463 24.3837 17.2725 22.8553L27.7525 3.08425C28.4932 1.68589 27.4824 0 25.9031 0ZM16.5111 8.44737L11.9923 16.9743C11.9133 17.1236 11.7953 17.2485 11.6508 17.3356C11.5064 17.4227 11.341 17.4688 11.1725 17.4688C11.0039 17.4688 10.8385 17.4227 10.6941 17.3356C10.5496 17.2485 10.4316 17.1236 10.3526 16.9743L5.87742 8.48324C5.80262 8.34167 5.76555 8.18313 5.76981 8.02298C5.77406 7.86284 5.81949 7.7065 5.9017 7.56913C5.98391 7.43175 6.10011 7.31798 6.23904 7.23883C6.37798 7.15969 6.53495 7.11786 6.69475 7.11738H15.7139C15.8697 7.11739 16.0228 7.15781 16.1584 7.23473C16.294 7.31164 16.4075 7.42242 16.4877 7.55631C16.568 7.69019 16.6123 7.84261 16.6164 7.99876C16.6205 8.1549 16.5842 8.30945 16.5111 8.44737Z"
        fill="#F71963"
      />
    </svg>
  )
}

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
    sections: [
      {
        subItems: [
          'Layout',
          'Site Editor Long Text',
          'Pages',
          'Styles',
          'Banners',
          'Layout',
          'Site Editor Long Text',
          'Pages',
          'Styles',
          'Banners',
          'Layout',
          'Site Editor Long Text',
          'Pages',
          'Styles',
          'Banners',
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
          <Set spacing="$l">
            <Button
              variant="neutralTertiary"
              csx={{ padding: '$xs' }}
              icon={<IconVtex />}
            />
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
              <tag.a href="https://www.google.com.br" csx={{ width: '100%' }}>
                <SidebarItem
                  icon={item.icon}
                  label={item.label}
                  uniqueKey={item.label}
                  key={item.label}
                />
              </tag.a>
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

            <a href="https://www.google.com.br">Link to trigger url preview</a>
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
