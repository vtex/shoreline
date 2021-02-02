import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Columns } from './index'
import { ThemeProvider } from '@vtex/admin-core'
import { ColumnsItem } from './Item'

describe('Columns tests', () => {
  beforeEach(() => {
    /**
     * 🚧 Workaround for window.match media
     * @see https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
     */
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Columns data-testid="columns" styleOverrides={{ bg: 'coral' }}>
          <ColumnsItem data-testid="item" styleOverrides={{ bg: 'azure' }}>
            <button>element 1</button>
          </ColumnsItem>
          <Columns.Item>
            <button>element 2</button>
          </Columns.Item>
        </Columns>
      </ThemeProvider>
    )

    expect(getByTestId('columns')).toHaveStyleRule('background-color', 'coral')
    expect(getByTestId('item')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Columns>
          <ColumnsItem>
            <button>element 1</button>
          </ColumnsItem>
          <Columns.Item>
            <button>element 2</button>
          </Columns.Item>
        </Columns>
        <Columns>
          <ColumnsItem units={4}>
            <button>element 1</button>
          </ColumnsItem>
          <Columns.Item units={4} offset="right">
            <button>element 2</button>
          </Columns.Item>
        </Columns>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Columns>
          <ColumnsItem>
            <button>element 1</button>
          </ColumnsItem>
          <Columns.Item>
            <button>element 2</button>
          </Columns.Item>
        </Columns>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
