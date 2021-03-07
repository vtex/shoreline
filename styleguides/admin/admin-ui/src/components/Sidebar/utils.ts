import { Variants } from 'framer-motion'
import { CompositeStateReturn } from './components/Aria'

interface VariantsArgs {
  direction: AnchorDirection
  currentItemIsCollapsible: boolean | null
  selected?: boolean
}

export type CornerScope = 'top' | 'bottom'

export interface SidebarSecretProps {
  state: CompositeStateReturn
  parentId?: string
  index?: number
  scope?: CornerScope
}

export type AnchorDirection = 'left' | 'right'

export interface Item {
  scope: CornerScope
  index: number
  isCollapsible: boolean
}

export enum ArrowKeys {
  Right = 'ArrowRight',
  Left = 'ArrowLeft',
}

export const SCALES = {
  MAX_SIDEBAR_WIDTH: '16rem',
  COLLAPSIBLE_AREA_WIDTH: '12.5rem',
  FIXED_AREA_WIDTH: '3.5rem',
  COLLAPSED_BACKDROP_WIDTH: '0.625rem',
}

export const SidebarItemVariants = ({
  direction,
  currentItemIsCollapsible,
  selected,
}: VariantsArgs): Variants => {
  return {
    expanded: () => ({
      [direction]: SCALES.FIXED_AREA_WIDTH,
      transition: {
        damping: 50,
      },
      transitionEnd: {
        zIndex: 0,
      },
    }),
    collapsed: () => ({
      [direction]:
        selected && currentItemIsCollapsible ? '-8.125rem' : '-13.5rem',
      transition: {
        damping: 50,
      },
      zIndex: -1,
    }),
  }
}

export const BackdropVariants = ({
  width,
}: {
  width: number | string
}): Variants => ({
  expanded: () => ({
    minWidth: width,
    width,
    transition: {
      damping: 50,
    },
  }),
  collapsed: () => ({
    minWidth: width,
    width,
    transition: {
      damping: 50,
    },
  }),
})

export const CollapseButtonVariants = ({
  left,
}: {
  left: number
}): Variants => ({
  expanded: () => ({
    left,
    transition: {
      damping: 50,
    },
  }),
  collapsed: () => ({
    left,
    transition: {
      damping: 50,
    },
  }),
})
