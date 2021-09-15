import React from 'react'
import { render, axe, withState } from '../../test-utils'
import 'mutationobserver-shim'

import {
  MenuSeparator,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMenuState,
} from './index'

global.MutationObserver = window.MutationObserver

const StatefulMenu = withState(Menu, () =>
  useMenuState({ visible: true, baseId: 'id' })
)

const StatefulHiddenMenu = withState(Menu, () =>
  useMenuState({ visible: false, baseId: 'id' })
)

describe('Menu', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <StatefulMenu>
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
      </StatefulMenu>
    )

    expect(getByTestId('menu')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot visible', () => {
    const { asFragment } = render(
      <StatefulMenu>
        <MenuButton>Open</MenuButton>
        <MenuList data-testid="menu" aria-label="menu label">
          <MenuItem>Download</MenuItem>
          <MenuItem>Link to</MenuItem>
          <MenuItem>Favorite</MenuItem>
          <MenuSeparator />
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </StatefulMenu>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot hidden', () => {
    const { asFragment } = render(
      <StatefulHiddenMenu>
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
      </StatefulHiddenMenu>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <StatefulMenu>
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
      </StatefulMenu>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
