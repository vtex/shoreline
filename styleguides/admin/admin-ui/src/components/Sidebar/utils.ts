import { CompositeStateReturn } from './components/Aria'

export type CornerScope = 'top' | 'bottom'

export interface SidebarSecretProps {
  secret: {
    state: CompositeStateReturn
    parentState?: CompositeStateReturn
    parentId?: string
  }
}

export type AnchorDirection = 'left' | 'right'

export interface CurrentItem {
  scope: CornerScope
  index: number
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
