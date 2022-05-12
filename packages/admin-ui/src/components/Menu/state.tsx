import type { MenuInitialState, MenuStateReturn } from 'reakit/Menu'
import { useMenuState as useReakitMenu } from 'reakit/Menu'

function useMenuState(initialState?: MenuInitialState | undefined) {
  const menuState = useReakitMenu({
    gutter: 4,
    ...initialState,
  })

  return menuState
}

export { useMenuState }
export type { MenuStateReturn }
