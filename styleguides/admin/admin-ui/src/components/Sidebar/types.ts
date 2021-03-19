import { ReactNode } from 'react'
import { SystemComponent } from '../../types'
import { CompositeStateReturn } from './components/Aria'

export type CornerScope = 'top' | 'bottom'

export interface SidebarSecretProps extends Omit<SystemComponent, 'children'> {
  children?: ReactNode
  state?: CompositeStateReturn
  /**
   * `parentId` refers to the current Composite root state item.
   * @internal
   */
  parentId?: string
  /**
   * `index` refers to the position of a `<Sidebar.Item {...props} />` on a section.
   *  @internal
   */
  index?: number
  /**
   * `scope` refers to the scope of a section, whether it organizes its children
   * on the top, or bottom of the sidebar.
   *  @internal
   */
  scope?: CornerScope
  /**
   * `showCollapseButton` lets <SidebarCollapseButton /> know whether or not
   * to switch the opacity of its button
   */
  showCollapseButton?: boolean
  /**
   * `setShowCollapseButton` changes the `showCollapseButton`
   * variable
   */
  setShowCollapseButton?: (showCollapseButton: boolean) => void
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
