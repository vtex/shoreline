import { MenuStateReturn } from './components/AriaSidebar'

export type CornerScope = 'top' | 'bottom'

export interface SidebarSecretProps {
  secret: { state: MenuStateReturn }
}

export type AnchorDirection = 'left' | 'right'
