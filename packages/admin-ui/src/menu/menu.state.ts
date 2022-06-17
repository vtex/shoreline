import { useMenuState as useAriakitMenuState } from 'ariakit/menu'

export const useMenuState = () =>
  useAriakitMenuState({
    placement: 'bottom-end',
  })
