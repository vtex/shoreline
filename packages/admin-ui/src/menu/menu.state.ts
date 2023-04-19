import type { MenuState, MenuStateProps } from 'ariakit/menu'
import { useMenuState as useAriakitMenuState } from 'ariakit/menu'

export const useMenuState = (props?: MenuStateProps): MenuState =>
  useAriakitMenuState({
    placement: 'bottom-end',
    ...props,
  })

export type { MenuState } from 'ariakit/menu'
