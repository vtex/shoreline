import { CompositeStateReturn } from './components/Aria'

export type CornerScope = 'top' | 'bottom'

export interface SidebarSecretProps {
  secret: { state: CompositeStateReturn }
}

export type AnchorDirection = 'left' | 'right'

export interface CurrentItem {
  scope: CornerScope
  index: number
}
