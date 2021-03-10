import { CompositeStateReturn } from './components/Aria'

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

export enum SidebarItemVariantsKey {
  FullyExpanded = 'fullyExpanded',
  FullyCollapsed = 'fullyCollapsed',
  PartiallyExpanded = 'partiallyExpanded',
  PartiallyCollapsed = 'partiallyCollapsed',
}
