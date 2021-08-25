import React from 'react'
import { render, axe } from '../../test-utils'
import 'mutationobserver-shim'

import { Menu } from './index'

global.MutationObserver = window.MutationObserver

describe('Menu tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Menu
        visible
        data-testid="menu"
        data-boxtestid="menubox"
        aria-label="menu label"
        csx={{
          bg: 'coral',
        }}
        disclosure={<button>Open</button>}
      >
        <Menu.Item>Download</Menu.Item>
        <Menu.Item>Link to</Menu.Item>
        <Menu.Item>Favorite</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Delete</Menu.Item>
      </Menu>
    )

    expect(getByTestId('menubox')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot visible', () => {
    const { asFragment } = render(
      <Menu
        visible
        data-testid="menu"
        data-boxtestid="menubox"
        aria-label="menu label"
        disclosure={<button>Open</button>}
        baseId="id"
      >
        <Menu.Item>Download</Menu.Item>
        <Menu.Item>Link to</Menu.Item>
        <Menu.Item>Favorite</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Delete</Menu.Item>
      </Menu>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot hidden', () => {
    const { asFragment } = render(
      <Menu
        data-testid="menu"
        data-boxtestid="menubox"
        aria-label="menu label"
        disclosure={<button>Open</button>}
        baseId="id"
      >
        <Menu.Item>Download</Menu.Item>
        <Menu.Item>Link to</Menu.Item>
        <Menu.Item>Favorite</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Delete</Menu.Item>
      </Menu>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Menu
        visible
        data-testid="menu"
        data-boxtestid="menubox"
        aria-label="menu label"
        disclosure={<button>Open</button>}
      >
        <Menu.Item>Download</Menu.Item>
        <Menu.Item>Link to</Menu.Item>
        <Menu.Item>Favorite</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
      </Menu>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
