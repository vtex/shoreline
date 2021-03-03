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
