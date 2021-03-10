import { Transition, Variants } from 'framer-motion'
import { CompositeStateReturn } from './components/Aria'

interface VariantsArgs {
  direction: AnchorDirection
  currentItemIsCollapsible: boolean | null
  selected?: boolean
}

export type CornerScope = 'top' | 'bottom'

export interface SidebarSecretProps {
  state: CompositeStateReturn
  /**
   * `parentId` refers to the current Composite root state item.
   */
  parentId?: string
  /**
   * `index` refers to the position of a `<Sidebar.Item {...props} />` on a section.
   */
  index?: number
  /**
   * `scope` refers to the scope of a section, whether it organizes its children
   * on the top, or bottom of the sidebar.
   */
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

export enum SidebarItemVariantsKey {
  FullyExpanded = 'fullyExpanded',
  FullyCollapsed = 'fullyCollapsed',
  PartiallyExpanded = 'partiallyExpanded',
  PartiallyCollapsed = 'partiallyCollapsed',
}

const transition: Transition = {
  type: 'spring',
  damping: 50,
  stiffness: 700,
}

export const SidebarItemVariants = ({
  direction,
  currentItemIsCollapsible,
  selected,
}: VariantsArgs): Variants => {
  return {
    [SidebarItemVariantsKey.FullyExpanded]: () => ({
      [direction]: SCALES.FIXED_AREA_WIDTH,
      display: 'block',
      opacity: 1,
      transition,
      transitionEnd: {
        zIndex: 0,
      },
    }),
    [SidebarItemVariantsKey.FullyCollapsed]: () => ({
      [direction]:
        selected && currentItemIsCollapsible ? '-8.125rem' : '-13.5rem',
      transition,
      zIndex: -1,
      transitionEnd: {
        display: 'none',
      },
    }),
    [SidebarItemVariantsKey.PartiallyExpanded]: () => ({
      [direction]: SCALES.FIXED_AREA_WIDTH,
      display: 'block',
      opacity: 1,
      transition: {
        ...transition,
        stiffness: 600,
      },
      transitionEnd: {
        zIndex: 0,
      },
    }),
    [SidebarItemVariantsKey.PartiallyCollapsed]: () => ({
      [direction]: selected && currentItemIsCollapsible ? '-8.125rem' : '3rem',
      transition: {
        ...transition,
        stiffness: 600,
      },
      zIndex: -1,
      opacity: 0,
      transitionEnd: {
        display: 'none',
      },
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
    transition,
    zIndex: -2,
  }),
  collapsed: () => ({
    minWidth: width,
    width,
    transition,
  }),
})
