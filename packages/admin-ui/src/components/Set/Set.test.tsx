import React from 'react'
import { render, axe } from '../../test-utils'

import { Set } from './index'

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
      <Set data-testid="set" csx={{ bg: 'coral' }}>
        <button>element 1</button>
        <button>element 2</button>
      </Set>
    )

    expect(getByTestId('set')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
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
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Set>
        <button>element 1</button>
        <button>element 2</button>
      </Set>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
