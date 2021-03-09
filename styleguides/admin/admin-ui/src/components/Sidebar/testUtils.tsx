import React from 'react'
import { SidebarItemProps } from './components/Item'
import {
  IconDashboard,
  IconAppStore,
  IconMarketplace,
  IconOrders,
  IconProducts,
  IconPromotions,
  IconProps,
  IconSettings,
  IconShipping,
  IconStorefront,
} from '@vtex/admin-ui-icons'
import { Sidebar } from '.'

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

const storeFront = ['Layout', 'Site Editor', 'Pages', 'Styles', 'Banners']

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

export const topCornerItems: ItemProps = [
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
        title: 'Orders (section)', // (section) is included for testing purposes
        children: orders.map((label, index) => (
          <Sidebar.SubItem
            onClick={() => console.log('Click me')}
            key={index}
            selected={index === 0}
          >
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
        children: catalog.map((label, index) => (
          <Sidebar.SubItem
            onClick={() => console.log('Click me')}
            key={index}
            selected={index === 0}
          >
            {label}
          </Sidebar.SubItem>
        )),
      },
      {
        title: 'Prices',
        children: catalog2.map((label, index) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')} key={index}>
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
        children: promotions.map((label, index) => (
          <Sidebar.SubItem
            onClick={() => console.log('Click me')}
            key={index}
            selected={index === 0}
          >
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
        children: storeFront.map((label, index) => (
          <Sidebar.SubItem
            onClick={() => console.log('Click me')}
            key={index}
            selected={index === 0}
          >
            {label}
          </Sidebar.SubItem>
        )),
      },
      {
        title: 'Intelligent Search',
        children: intelligentSearch.map((label, index) => (
          <Sidebar.SubItem onClick={() => console.log('Click me')} key={index}>
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
        title: 'Shipping (section)', // (section) is included for testing purposes
        children: shipping.map((label, index) => (
          <Sidebar.SubItem
            onClick={() => console.log('Click me')}
            key={index}
            selected={index === 0}
          >
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

export const bottomCornerItems: ItemProps = [
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
