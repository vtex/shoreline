import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { List } from './index'
import { ThemeProvider } from '../../system'

describe('List tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <List data-testid="list" styleOverrides={{ bg: 'azure' }}>
          <List.Item data-testid="listitem" styleOverrides={{ bg: 'coral' }}>
            Item
          </List.Item>
        </List>
      </ThemeProvider>
    )

    expect(getByTestId('list')).toHaveStyleRule('background-color', 'azure')
    expect(getByTestId('listitem')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <List>
          <List.Item>Item</List.Item>
        </List>
        <List ordered>
          <List.Item>Item</List.Item>
        </List>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <List>
          <List.Item>Item</List.Item>
        </List>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
