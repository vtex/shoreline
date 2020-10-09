// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-shadow */
// import React from 'react'
// import { Meta, Story } from '@storybook/react'
// import { Icon, IconProps } from '@vtex-components/icon'

// import {
//   IconCancel,
//   IconCaret,
//   IconArrow,
//   IconCaretBig,
//   IconAddChannel,
//   IconAppStore,
//   IconCatalog,
//   IconContent,
//   IconDashboard,
//   IconHelp,
//   IconMarketing,
//   IconMarketPlace,
//   IconNotifications as Notification,
//   IconOrders,
//   IconSettings,
//   IconUser,
//   IconTruck,
//   IconMoney,
//   IconPrinter,
//   IconDownload,
//   IconFavorite,
//   IconLink,
//   IconCustomers,
//   IconGlobe,
//   IconKeys,
//   IconLogout,
//   IconOnlineStore,
//   IconShipping,
//   IconRocket,
//   IconFlag,
//   IconBook,
//   IconCode,
//   IconHeartbeat,
//   IconDocument,
//   IconSupport,
// } from './index'
// import { Box } from '../components/Box'
// import { IconWithDirection, IconWithDirectionProps } from './IconWithDirection'
// import { IconProducts } from './Products'

// export default {
//   title: 'beta/Icons',
//   component: Icon,
// } as Meta

// const Template: Story<IconProps> = ({ list, ...args }: any) => (
//   <Box>
//     {list.map((AdminIcon: React.FC<IconProps>, index: number) => (
//       <AdminIcon key={index} {...args} />
//     ))}
//   </Box>
// )

// export const Essentials = Template.bind({})

// Essentials.args = {
//   list: [IconCancel, IconDownload, IconFavorite, IconLink, IconPrinter],
//   size: 24,
// }

// export const AdminShell = Template.bind({})

// AdminShell.args = {
//   list: [
//     IconAddChannel,
//     IconAppStore,
//     IconCatalog,
//     IconContent,
//     IconDashboard,
//     IconHelp,
//     IconMarketing,
//     IconMarketPlace,
//     function IconNotifications({ on = true, ...props }) {
//       return <Notification {...props} on={on} />
//     },
//     function IconNotifications({ on = false, ...props }) {
//       return <Notification {...props} on={on} />
//     },
//     IconOrders,
//     IconSettings,
//     IconUser,
//     IconCustomers,
//     IconShipping,
//     IconKeys,
//     IconGlobe,
//     IconLogout,
//     IconOnlineStore,
//     IconProducts,
//     IconRocket,
//     IconFlag,
//     IconBook,
//     IconCode,
//     IconHeartbeat,
//     IconDocument,
//     IconSupport,
//   ],
//   size: 24,
// }

// export const AdminHome = Template.bind({})
// AdminHome.args = {
//   list: [
//     IconTruck,
//     IconMoney,
//     IconMarketing,
//     IconContent,
//     IconOrders,
//     IconCatalog,
//   ],
//   size: 24,
// }

// const iconWithDirection = [IconArrow, IconCaret, IconCaretBig]

// const TemplateWithDirection: Story<IconWithDirectionProps> = (args) => (
//   <Box>
//     {iconWithDirection.map((AdminIcon, index) => (
//       <AdminIcon key={index} {...args} />
//     ))}
//   </Box>
// )

// export const AllIconsWithDirection = TemplateWithDirection.bind({})

// AllIconsWithDirection.args = {
//   size: 32,
//   direction: 'up',
// }

// export const AbstractIcon = () => (
//   <Icon>
//     {/** Fill with your svg here, using currentColor whenever needed */}
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M14.83 9.16992L9.16998 14.8299"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M14.83 14.8299L9.16998 9.16992"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Icon>
// )

// export const AbstractIconWithDirection = () => (
//   <IconWithDirection direction="right">
//     {/** Fill with your svg here, using currentColor whenever needed. */}
//     {/** Use the default svg the 'up' version */}
//     <path
//       d="M12.01 4.51025V19.5003"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M6.02301 10.514L12 4.49805L17.977 10.514"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </IconWithDirection>
// )
