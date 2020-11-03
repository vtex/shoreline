import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Set } from './index'
import { ThemeProvider } from '../../system'

describe('Set tests', () => {
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
        <Set data-testid="set" styleOverrides={{ bg: 'black' }}>
          <button>element 1</button>
          <button>element 2</button>
        </Set>
      </ThemeProvider>
    )

    expect(getByTestId('set')).toHaveStyleRule('background-color', 'black')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Set>
          <button>element 1</button>
          <button>element 2</button>
        </Set>
        <Set align="end">
          <button>element 1</button>
          <button>element 2</button>
        </Set>
        <Set orientation="vertical">
          <button>element 1</button>
          <button>element 2</button>
        </Set>
        <Set orientation="vertical" fluid>
          <button>element 1</button>
          <button>element 2</button>
        </Set>
        <Set orientation="vertical" fluid align="end">
          <button>element 1</button>
          <button>element 2</button>
        </Set>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Set>
          <button>element 1</button>
          <button>element 2</button>
        </Set>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
