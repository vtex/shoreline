import { MenuStateReturn } from './components/AriaSidebar'

export type CornerScope = 'top' | 'bottom'

export interface SidebarSecretProps {
  secret: { state: MenuStateReturn }
}

export type AnchorDirection = 'left' | 'right'

export const SCALES = {
  COLLAPSIBLE_AREA_WIDTH: '12.5rem',
  FIXED_AREA_WIDTH: '3.5rem',
}
