import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Menu } from '../menu'
import { MenuProvider } from '../menu-provider'
import { MenuItem } from '../menu-item'
import { MenuTrigger } from '../menu-trigger'
import { MenuSeparator } from '../menu-separator'

describe('menu', () => {
  it('renders', () => {
    const { container, unmount } = render(
      <MenuProvider>
        <MenuTrigger asChild>
          <button>Open</button>
        </MenuTrigger>
        <Menu>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuSeparator />
          <MenuItem>Item 3</MenuItem>
        </Menu>
      </MenuProvider>,
      { container: document.body }
    )

    expect(container.querySelector('[data-sl-menu]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-menu-trigger]')
    ).toBeInTheDocument()
    expect(container.querySelector('[data-sl-menu-item]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-menu-separator]')
    ).toBeInTheDocument()

    unmount()
  })
})
