import type { MenuInitialState } from 'reakit/Menu'
import { useMenuState as useReakitMenu, MenuStateReturn } from 'reakit/Menu'

function useMenuState(initialState?: MenuInitialState | undefined) {
  const menuState = useReakitMenu({
    gutter: 4,
    ...initialState,
  })

  return menuState
}

export { useMenuState, MenuStateReturn }
