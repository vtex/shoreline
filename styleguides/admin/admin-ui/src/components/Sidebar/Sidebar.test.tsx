import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Sidebar } from './index'
import { ThemeProvider } from '@vtex/admin-core'
import { bottomCornerItems, topCornerItems } from './testUtils'

describe('Sidebar tests', () => {
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

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Sidebar>
          <Sidebar.Header>
            {topCornerItems.map((props, index) => (
              <Sidebar.Item {...props} selected={index === 0} key={index} />
            ))}
          </Sidebar.Header>
          <Sidebar.Footer>
            {bottomCornerItems.map((props, index) => (
              <Sidebar.Item {...props} selected={false} key={index} />
            ))}
          </Sidebar.Footer>
        </Sidebar>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
