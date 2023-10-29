import React from 'react'

import { render, withState, fireEvent } from '../test-utils'
import { MenuButton, Menu, MenuItem, MenuDivider, useMenuState } from './index'

const StatefulMenuButton = withState(MenuButton, () => {
  const state = useMenuState()

  return { ...state, id: 'menu-button-test' }
})

const BaseMenuComponent = () => {
  const state = useMenuState()

  return (
    <>
      <MenuButton state={state} data-testid="menu-button-test" />
      <Menu state={state} data-testid="menu-test">
        <MenuItem label="Create" disabled />
        <MenuItem label="Edit" data-testid="menu-item-test" />
        <MenuItem label="Download" />
        <MenuDivider />
        <MenuItem label="Delete" critical />
      </Menu>
    </>
  )
}

describe('menu', () => {
  it('should have default label', async () => {
    const { findByTestId } = render(<BaseMenuComponent />)

    const button = await findByTestId('menu-button-test')

    expect(button).toHaveTextContent('More actions')
  })

  it('should be a custom menu', async () => {
    const { findByTestId } = render(
      <>
        <StatefulMenuButton
          data-testid="menu-button-test"
          label="Custom menu"
        />
      </>
    )

    const button = await findByTestId('menu-button-test')

    expect(button).not.toHaveTextContent('More actions')
    expect(button).toHaveTextContent('Custom menu')
    expect(button.getElementsByTagName('svg').item(0)).toBeTruthy()
  })

  it('should be icon only when label is hidden', async () => {
    const { findByTestId } = render(
      <>
        <StatefulMenuButton data-testid="menu-button-test" labelHidden />
        <StatefulMenuButton data-testid="custom-menu-button-test" labelHidden />
      </>
    )

    const button = await findByTestId('menu-button-test')
    const customButton = await findByTestId('custom-menu-button-test')

    expect(button.getElementsByTagName('svg')).toBeTruthy()
    expect(customButton.getElementsByTagName('svg').item(0)).toBeTruthy()
    expect(customButton.getElementsByTagName('svg').item(0)).toEqual(
      button.getElementsByTagName('svg').item(0)
    )
    expect(button).toHaveAttribute('aria-label', 'More actions')
    expect(customButton).toHaveAttribute('aria-label', 'More actions')
  })

  it('should be disabled', async () => {
    const { findByTestId } = render(
      <>
        <StatefulMenuButton data-testid="menu-button-test" disabled />
      </>
    )

    const button = await findByTestId('menu-button-test')

    expect(button).toHaveAttribute('disabled')
  })

  it('should show the popover', async () => {
    const { findByTestId } = render(<BaseMenuComponent />)

    const menu = await findByTestId('menu-test')
    const menuButton = await findByTestId('menu-button-test')

    expect(menu).not.toBeVisible()
    fireEvent.click(menuButton)
    expect(menu).toBeVisible()
  })

  it('should have a disabled menu item', async () => {
    const { findByText, findByTestId } = render(<BaseMenuComponent />)

    const menuButton = await findByTestId('menu-button-test')

    fireEvent.click(menuButton)

    const menuItem = await findByText('Create')

    expect(menuItem).toBeVisible()
    expect(menuItem.parentElement).toHaveStyle('pointer-events: none')
  })

  it('should close popover on menu item click', async () => {
    const { findByTestId } = render(<BaseMenuComponent />)

    const menu = await findByTestId('menu-test')
    const menuButton = await findByTestId('menu-button-test')
    const menuItem = await findByTestId('menu-item-test')

    expect(menu).not.toBeVisible()
    fireEvent.click(menuButton)
    expect(menu).toBeVisible()
    fireEvent.click(menuItem)
    expect(menu).not.toBeVisible()
  })
})
