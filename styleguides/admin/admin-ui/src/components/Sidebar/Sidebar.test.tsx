import React, { ReactElement } from 'react'
import { render, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Sidebar } from './index'
import { ThemeProvider } from '@vtex/admin-core'
import { bottomCornerItems, SECTIONS, topCornerItems } from './testUtils'
import { Item } from './types'
import { isElement } from 'react-is'
import { SidebarSectionItem } from './components'

const Component = ({ index: itemIndex, scope: itemScope }: Item) => {
  return (
    <Sidebar>
      <Sidebar.Header>
        {topCornerItems.map((props, index) => (
          <Sidebar.Item
            {...props}
            selected={itemScope === 'top' && index === itemIndex}
            key={index}
          >
            {SECTIONS[props.label].sections.map((section, idx) => (
              <Sidebar.Item.Section
                title={section.title}
                index={topCornerItems.length + idx}
              >
                {section.subItems.map((label) => (
                  <Sidebar.Item.Section.Item
                    key={label}
                    onClick={() => console.log(`hey`)}
                  >
                    {label}
                  </Sidebar.Item.Section.Item>
                ))}
              </Sidebar.Item.Section>
            ))}
          </Sidebar.Item>
        ))}
      </Sidebar.Header>
      <Sidebar.Footer>
        {bottomCornerItems.map((props, index) => (
          <Sidebar.Item
            {...props}
            selected={itemScope === 'bottom' && index === itemIndex}
            key={index}
          >
            {SECTIONS[props.label].sections.map((section, idx) => (
              <Sidebar.Item.Section
                title={section.title}
                index={topCornerItems.length + idx}
              >
                {section.subItems.map((label) => (
                  <Sidebar.Item.Section.Item
                    key={label}
                    onClick={() => console.log(`hey`)}
                  >
                    {label}
                  </Sidebar.Item.Section.Item>
                ))}
              </Sidebar.Item.Section>
            ))}
          </Sidebar.Item>
        ))}
      </Sidebar.Footer>
    </Sidebar>
  )
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
        <Component index={0} scope={'top'} isCollapsible />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('sidebar first level items should be visible', () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <Component index={0} scope={'top'} isCollapsible />
      </ThemeProvider>
    )

    topCornerItems.forEach((item) => {
      expect(getByLabelText(item.label)).toBeVisible()
    })
  })

  it('no item drawer should be visible', () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <Component index={-1} scope={'top'} isCollapsible />
      </ThemeProvider>
    )

    topCornerItems.concat(bottomCornerItems).forEach((item) => {
      const sectionElement = getByLabelText(`${item.label} menu`)
      expect(sectionElement).not.toBeVisible()
    })
  })

  it('selected item with sections should have its drawer visible', async () => {
    const selectedItemIndex = 1
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <Component index={selectedItemIndex} scope={'top'} isCollapsible />
      </ThemeProvider>
    )

    const item = topCornerItems[selectedItemIndex]

    await waitFor(() => {
      const sectionElement = getByTestId(`${item.label}-ul`)
      expect(sectionElement).toBeVisible()
    })

    Array.isArray(item.children) &&
      item.children.forEach((child) => {
        const section = isElement(child) && child

        if (!section) {
          expect(true).toBe(false)
        }

        const sectionElement = getByText((section as ReactElement).props.title)

        expect(sectionElement).toBeVisible()
        ;(section as ReactElement).props.children.forEach(
          (subItem: SidebarSectionItem) => {
            expect(subItem.children).toBeVisible()
          }
        )
      })
  })

  it("selected item with no sections should't have a drawer", async () => {
    const selectedItemIndex = 0
    const { getByTestId } = render(
      <ThemeProvider>
        <Component index={0} scope={'top'} isCollapsible />
      </ThemeProvider>
    )

    const item = topCornerItems[selectedItemIndex]

    await waitFor(() => {
      const sectionElement = getByTestId(`${item.label}-ul`)
      expect(sectionElement).not.toBeVisible()
    })
  })
})
