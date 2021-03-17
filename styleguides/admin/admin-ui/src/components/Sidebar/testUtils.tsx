import React from 'react'
import { SidebarItemProps } from './components/Item'
import {
  IconHome,
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

const iconProps: IconProps = {}

type ItemProps = SidebarItemProps[]

export const orders = [
  'All Orders',
  'Subscriptions Super Long Text',
  'Transactions',
  'Bank Conciliation Super Long Text',
]

export const promotions = [
  'All Promotions',
  'Coupons',
  'Campaign Audience Super Long Text',
  'Gift Cards',
  'Taxes',
]

export const storeFront = [
  'Layout',
  'Site Editor',
  'Pages',
  'Styles',
  'Banners',
]

export const catalog = [
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
]
export const catalog2 = ['Price List', 'Price Rules']

export const intelligentSearch = [
  'Explained Search',
  'Merchandising Rules Super Long Text',
  'Synonyms',
  'Indexing Status',
  'Relevance Rules',
  'Analytics',
  'Redirects',
]

export const shipping = [
  'Shipping Rates',
  'Shipping Simulator',
  'Pickup Points Super Long Text',
  'Shipping Strategy',
]

export const SECTIONS: {
  [key: string]: { sections: { subItems: string[]; title: string }[] }
} = {
  Home: {
    sections: [],
  },
  Orders: {
    sections: [{ subItems: orders, title: 'Orders' }],
  },
  Products: { sections: [{ subItems: catalog, title: 'Discounts' }] },
  Promotions: { sections: [{ subItems: promotions, title: 'Promotions' }] },
  Storefront: {
    sections: [{ subItems: intelligentSearch, title: 'Intelligent Search' }],
  },
  Shipping: { sections: [{ subItems: shipping, title: 'Shipping' }] },
  Marketplace: {
    sections: [],
  },
  'App Store': {
    sections: [],
  },
  Settings: {
    sections: [],
  },
}

export const topCornerItems: ItemProps = [
  {
    icon: <IconHome {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Home',
  },
  {
    icon: <IconOrders {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Orders',
  },
  {
    icon: <IconProducts {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Products',
  },
  {
    icon: <IconPromotions {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Promotions',
  },
  {
    icon: <IconStorefront {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Storefront',
  },
  {
    icon: <IconShipping {...iconProps} />,
    onClick: () => console.log('Click me'),
    label: 'Shipping',
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
