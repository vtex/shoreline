import React, { Fragment, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Sidebar } from './index'
import { ThemeProvider } from '@vtex/admin-core'
import { SidebarState, useSidebarState } from './hooks'

function StateHandler(props: { children: (state: SidebarState) => ReactNode }) {
  const state = useSidebarState()

  return <Fragment>{props.children(state)}</Fragment>
}

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
        <StateHandler>
          {(state) => (
            <Sidebar state={state}>
              <Sidebar.Top>
                <Sidebar.Item label="label 1" uniqueKey="label 1" icon="Icon">
                  <Sidebar.Item.Section title="title 1">
                    <Sidebar.Item.Section.Item onClick={() => null}>
                      Item
                    </Sidebar.Item.Section.Item>
                  </Sidebar.Item.Section>
                </Sidebar.Item>
              </Sidebar.Top>
              <Sidebar.Bottom>
                <Sidebar.Item icon="icon" label="label 2" uniqueKey="label 2" />
              </Sidebar.Bottom>
            </Sidebar>
          )}
        </StateHandler>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
