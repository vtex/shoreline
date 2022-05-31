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

describe('Menu', () => {
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
