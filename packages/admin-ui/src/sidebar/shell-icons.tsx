import { get } from '@vtex/admin-ui-util'
import {
  IconKey,
  IconReceipt,
  IconFlag,
  IconHouse,
  IconShoppingCartSimple,
  IconTag,
  IconMegaphone,
  IconLayout,
  IconChartBar,
  IconGearSix,
  IconStack,
  IconShareNetwork,
  IconCube,
} from '@vtex/phosphor-icons'
import React from 'react'

const shellIconMap = {
  dashboard: <IconChartBar />,
  gettingStarted: <IconFlag />,
  home: <IconHouse />,
  orders: <IconShoppingCartSimple />,
  products: <IconTag />,
  promotions: <IconMegaphone />,
  storeFront: <IconLayout />,
  shipping: <IconCube />,
  marketplace: <IconShareNetwork />,
  appStore: <IconStack />,
  storeSettings: <IconGearSix />,
  accountSettings: <IconKey />,
  billing: <IconReceipt />,
}

export function getShellIcon(icon: string) {
  return get(shellIconMap, icon, <></>)
}
