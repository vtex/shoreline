import React from 'react'
import * as AdminUI from '@vtex/admin-ui'

function generateMap() {
  const icons = [...iconsDoc].sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1

    return 0
  })

  return icons.map((name) => {
    const Icon = AdminUI[`Icon${name}`]

    return {
      id: name,
      name,
      icon: <Icon />,
    }
  })
}

export interface IconProps {
  weight?: 'fill' | 'regular'
  size?: number
}

const iconsDoc = [
  'CaretUp',
  'CaretDown',
  'CaretLeft',
  'CaretRight',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Plus',
  'Minus',
  'X',
  'ChatText',
  'CopySimple',
  'Heart',
  'Flag',
  'PaperPlaneTilt',
  'Printer',
  'Check',
  'CalendarBlank',
  'Alarm',
  'Clock',
  'ArrowCounterClockwise',
  'ArrowsClockwise',
  'ArrowUUpLeft',
  'MapPin',
  'Eye',
  'EyeSlash',
  'LockKey',
  'LockKeyOpen',
  'MagnifyingGlass',
  'DotsThreeVertical',
  'ArrowLineDown',
  'ArrowLineUp',
  'Faders',
  'Trash',
  'Pencil',
  'ArrowSquareOut',
  'ArrowUpRight',
  'ArrowCircleUpRight',
  'ArrowSquareUpRight',
  'Archive',
  'DotsSixVertical',
  'SquaresFour',
  'Rows',
  'ChartLineUp',
  'CreditCard',
  'Barcode',
  'Gift',
  'User',
  'Users',
  'Truck',
  'Storefront',
  'CurrencyCircleDollar',
  'Ticket',
  'HandbagSimple',
  'RocketLaunch',
  'House',
  'ShoppingCartSimple',
  'Tag',
  'Megaphone',
  'Layout',
  'GearSix',
  'Notebook',
  'Code',
  'Activity',
  'Headset',
  'IdentificationCard',
  'Key',
  'Receipt',
  'GlobeHemisphereWest',
  'SignOut',
  'List',
  'ChartBar',
  'CloudArrowUp',
  'Link',
  'LinkBreak',
  'Paperclip',
  'Envelope',
  'FileText',
  'ImageSquare',
  'MagnifyingGlassPlus',
  'CornersOut',
  'ListDashes',
  'ListNumbers',
  'TextAlignLeft',
  'TextAlignCenter',
  'TextAlignRight',
  'TextBolder',
  'TextItalic',
  'TextUnderline',
  'Folder',
  'Question',
  'Bell',
  'XCircle',
  'XOctagon',
  'Warning',
  'WarningCircle',
  'CheckCircle',
  'Cube',
  'ShareNetwork',
  'Stack',
] as const

export const filled = ['Warning', 'Bell', 'Envelope', 'XOctagon']
export const small = [
  'CaretDown',
  'CaretRight',
  'X',
  'ArrowUpRight',
  'Check',
  'Minus',
]

export const icons = generateMap()
