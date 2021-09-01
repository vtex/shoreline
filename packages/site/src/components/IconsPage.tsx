import React from 'react'
import { Box, get, Text, Heading } from '@vtex/admin-ui'
import type { IconProps } from '@vtex/admin-ui-icons'
import * as AdminIcon from '@vtex/admin-ui-icons'

import { Searchbar, useSearch } from './Searchbar'

export function IconPage() {
  const { current, searchState } = useSearch()

  const sections = [
    {
      title: 'Essential',
      icons: [
        {
          label: 'Arrow',
        },
        {
          label: 'Arrow',
          display: 'Arrow direction="right"',
          props: {
            direction: 'right',
          } as Record<string, unknown>,
        },
        {
          label: 'Arrow',
          display: 'Arrow direction="down"',
          props: {
            direction: 'down',
          } as Record<string, unknown>,
        },
        {
          label: 'Arrow',
          display: 'Arrow direction="left"',
          props: {
            direction: 'left',
          } as Record<string, unknown>,
        },
        {
          label: 'Export',
        },
        {
          label: 'Import',
        },
        {
          label: 'CaretBig',
        },
        {
          label: 'CaretBig',
          display: 'CaretBig direction="right"',
          props: {
            direction: 'right',
          },
        },
        {
          label: 'CaretBig',
          display: 'CaretBig direction="down"',
          props: {
            direction: 'down',
          },
        },
        {
          label: 'CaretBig',
          display: 'CaretBig direction="left"',
          props: {
            direction: 'left',
          },
        },
        {
          label: 'Caret',
        },
        {
          label: 'Undo',
        },
        {
          label: 'Caret',
          display: 'Caret direction="right"',
          props: {
            direction: 'right',
          },
        },
        {
          label: 'Caret',
          display: 'Caret direction="down"',
          props: {
            direction: 'down',
          },
        },
        {
          label: 'Caret',
          display: 'Caret direction="left"',
          props: {
            direction: 'left',
          },
        },
        {
          label: 'Edit',
        },
        {
          label: 'Delete',
        },
        {
          label: 'Add',
        },
        {
          label: 'AddCircle',
        },
        {
          label: 'Close',
        },
        {
          label: 'Cancel',
        },
        {
          label: 'Save',
        },
        {
          label: 'WarningCircle',
        },
        {
          label: 'WarningTriangle',
        },
        {
          label: 'Duplicate',
        },
        {
          label: 'Check',
        },
        {
          label: 'Action',
        },
        {
          label: 'Preview',
        },
        {
          label: 'Hide',
        },
        {
          label: 'Favorite',
        },
        {
          label: 'Unfavorite',
        },
        {
          label: 'Lock',
        },
        {
          label: 'Unlock',
        },
        {
          label: 'Search',
        },
        {
          label: 'Publish',
        },
        {
          label: 'Link',
        },
        {
          label: 'Unlink',
        },
        {
          label: 'Comment',
        },
        {
          label: 'Scale',
        },
        {
          label: 'Share',
        },
        {
          label: 'Report',
        },
        {
          label: 'Drag',
        },
        {
          label: 'Pin',
        },
        {
          label: 'Analytics',
        },
        {
          label: 'Clock',
        },
        {
          label: 'CalendarSearch',
        },
        {
          label: 'CalendarEdit',
        },
        {
          label: 'CalendarTime',
        },
        {
          label: 'CalendarAdd',
        },
        {
          label: 'Code',
        },
        {
          label: 'Devices',
        },
        {
          label: 'User',
        },
        {
          label: 'Filter',
        },
        {
          label: 'Feedback',
        },
        {
          label: 'Help',
        },
        {
          label: 'Refresh',
        },
        {
          label: 'Send',
        },
        {
          label: 'Settings',
        },
        {
          label: 'Info',
        },
      ],
    },
    {
      title: 'Admin Shell',
      icons: [
        {
          label: 'Dashboard',
        },
        {
          label: 'Orders',
        },
        {
          label: 'Products',
        },
        {
          label: 'Shipping',
        },
        {
          label: 'Customers',
        },
        {
          label: 'Promotions',
        },
        {
          label: 'Storefront',
        },
        {
          label: 'Marketplace',
        },
        {
          label: 'AppStore',
        },
        {
          label: 'StoreSettings',
        },
        {
          label: 'Notifications',
        },
        {
          label: 'Notifications',
          display: 'Notifications on={true}',
          props: {
            on: true,
          } as Record<string, unknown>,
        },
        {
          label: 'KnowledgeBase',
        },
        {
          label: 'WhatsNew',
        },
        {
          label: 'GettingStarted',
        },
        {
          label: 'HelpCenter',
        },
        {
          label: 'Status',
        },
        {
          label: 'Blog',
        },
        {
          label: 'UserSettings',
        },
        {
          label: 'AccountSettings',
        },
        {
          label: 'Billing',
        },
        {
          label: 'Language',
        },
        {
          label: 'Logoff',
        },
      ],
    },
    {
      title: 'Rich Text',
      icons: [
        {
          label: 'Bold',
        },
        {
          label: 'Italic',
        },
        {
          label: 'Underline',
        },
        {
          label: 'Topic',
        },
        {
          label: 'Number',
        },
        {
          label: 'LeftAligned',
        },
        {
          label: 'CenterAligned',
        },
        {
          label: 'RightAligned',
        },
        {
          label: 'Image',
        },
        {
          label: 'Fullscreen',
        },
        {
          label: 'Link',
        },
      ],
    },
    {
      title: 'E-commerce',
      icons: [
        {
          label: 'ShippingTruck',
        },
        {
          label: 'Card',
        },
        {
          label: 'CardAdd',
        },
        {
          label: 'CardRemove',
        },
        {
          label: 'Tracking',
        },
        {
          label: 'Return',
        },
        {
          label: 'Warehouse',
        },
        {
          label: 'LoadingDocks',
        },
        {
          label: 'Inventory',
        },
        {
          label: 'Store',
        },
        {
          label: 'POS',
        },
        {
          label: 'Barcode',
        },
        {
          label: 'Coupon',
        },
        {
          label: 'Sales',
        },
        {
          label: 'PaymentMethod',
        },
        {
          label: 'Calculator',
        },
        {
          label: 'Cash',
        },
        {
          label: 'Currency',
        },
        {
          label: 'Pickup',
        },
        {
          label: 'Invoice',
        },
        {
          label: 'DiscountSearch',
        },
        {
          label: 'GiftCard',
        },
        {
          label: 'Support',
        },
      ],
    },
    {
      title: 'Colorful',
      icons: [
        {
          label: 'SuccessColorful',
        },
        {
          label: 'WarningColorful',
        },
        {
          label: 'ErrorColorful',
        },
      ],
    },
    {
      title: 'Not mapped',
      icons: [
        {
          label: 'Printer',
          // ?????
        },
        {
          label: 'Content',
          // ?????
        },
      ],
    },
  ]

  return (
    <Box>
      <Searchbar
        placeholder="Search for icon"
        id="searchbar"
        state={searchState}
      />
      {sections.map((section) => (
        <Box
          key={section.title}
          as="section"
          csx={{
            marginY: 5,
          }}
        >
          <Heading>{section.title}</Heading>
          <Box
            csx={{
              display: 'flex',
              flex: '1 0  100%',
              flexWrap: 'wrap',
              marginTop: 4,
              marginX: '-20px',
            }}
          >
            {section.icons
              .filter((icon) =>
                current !== ''
                  ? icon.label
                      .toLocaleLowerCase()
                      .includes(current.toLowerCase())
                  : icon
              )
              .map((icon) => {
                const { display, label, props } = icon
                const CurrentIcon = (get(AdminIcon, `Icon${label}`, () => (
                  <Text>missing</Text>
                )) as React.FC<IconProps>) ?? <Text>missing</Text>

                return (
                  <Box
                    key={display ?? label}
                    as="button"
                    csx={{
                      color: 'dark.primary',
                      bg: 'light.primary',
                      border: 'none',
                      flex: '0 0 auto',
                      width: '2/12',
                      marginBottom: 6,
                      paddingX: 5,
                      paddingY: 2,
                      cursor: 'pointer',
                      transition: 'snap',
                      outline: 'none',
                      ':hover': {
                        boxShadow: 'subtle',
                        borderRadius: 'default',
                        zIndex: '999',
                      },
                      ':active': {
                        transform: 'scale(0.98)',
                      },
                    }}
                  >
                    <Box
                      csx={{
                        display: 'block',
                      }}
                    >
                      <Box
                        csx={{
                          borderRadius: 'default',
                          bg: 'light.secondary',
                          color: 'dark.primary',
                          paddingY: 6,
                          paddingX: 4,
                          textAlign: 'center',
                          marginBottom: 2,
                        }}
                      >
                        <CurrentIcon {...props} size={24} />
                      </Box>
                      <Box
                        csx={{
                          textAlign: 'center',
                        }}
                      >
                        {display ?? label}
                      </Box>
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
