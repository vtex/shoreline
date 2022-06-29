import { useMenuState as useAriakitMenuState } from 'ariakit/menu'

export const useMenuState: MenuStateReturn = (props?) =>
  useAriakitMenuState({
    placement: 'bottom-end',
    ...props,
  })

export type MenuStateReturn = typeof useAriakitMenuState
export type { MenuState } from 'ariakit/menu'
