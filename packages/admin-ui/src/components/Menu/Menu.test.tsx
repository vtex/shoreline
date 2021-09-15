import React from 'react'
import { render, axe } from '../../test-utils'
import 'mutationobserver-shim'

import type { MenuStateReturn } from './index'
import {
  MenuSeparator,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMenuState,
} from './index'

global.MutationObserver = window.MutationObserver

function MenuState({
  children,
}: {
  children: (props: MenuStateReturn) => void
}) {
  const state = useMenuState({ visible: true, baseId: 'id' })

  return <>{children(state)}</>
}

describe('Menu', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <MenuState>
        {(state) => (
          <Menu state={state}>
            <MenuButton>Open</MenuButton>
            <MenuList
              data-testid="menu"
              aria-label="menu label"
              csx={{
                bg: 'coral',
              }}
            >
              <MenuItem>Download</MenuItem>
              <MenuItem>Link to</MenuItem>
              <MenuItem>Favorite</MenuItem>
              <MenuSeparator />
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      </MenuState>
    )

    expect(getByTestId('menu')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot visible', () => {
    const { asFragment } = render(
      <MenuState>
        {(state) => (
          <Menu state={state}>
            <MenuButton>Open</MenuButton>
            <MenuList data-testid="menu" aria-label="menu label">
              <MenuItem>Download</MenuItem>
              <MenuItem>Link to</MenuItem>
              <MenuItem>Favorite</MenuItem>
              <MenuSeparator />
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      </MenuState>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot hidden', () => {
    const { asFragment } = render(
      <MenuState>
        {(state) => (
          <Menu state={state}>
            <MenuButton>Open</MenuButton>
            <MenuList
              data-testid="menu"
              aria-label="menu label"
              csx={{
                bg: 'coral',
              }}
            >
              <MenuItem>Download</MenuItem>
              <MenuItem>Link to</MenuItem>
              <MenuItem>Favorite</MenuItem>
              <MenuSeparator />
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      </MenuState>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <MenuState>
        {(state) => (
          <Menu state={state}>
            <MenuButton>Open</MenuButton>
            <MenuList
              data-testid="menu"
              aria-label="menu label"
              csx={{
                bg: 'coral',
              }}
            >
              <MenuItem>Download</MenuItem>
              <MenuItem>Link to</MenuItem>
              <MenuItem>Favorite</MenuItem>
              <MenuSeparator />
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      </MenuState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
