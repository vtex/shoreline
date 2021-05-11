import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'
import { axe } from 'jest-axe'

import { FilterBar } from '../index'

describe('FilterBar tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <FilterBar
          label="Filter Bar"
          csx={{ bg: 'coral' }}
          data-testid="filter-bar"
          onStatementChange={() => {}}
          filters={[
            {
              label: 'Filter',
              id: 'filter',
              conditions: [{ label: 'is', id: '1' }],
              resolver: {
                type: 'simple',
                defaultValue: { value: 'item 1' },
                items: [
                  { value: 'item 1' },
                  { value: 'item 2' },
                  { value: 'item 3' },
                ],
              },
            },
          ]}
        />
      </ThemeProvider>
    )

    expect(getByTestId('filter-bar')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should match snapshot', async () => {
    const { asFragment } = render(
      <ThemeProvider>
        <FilterBar
          label="Filter Bar"
          csx={{ bg: 'coral' }}
          data-testid="filter-bar"
          onStatementChange={() => {}}
          statements={[
            {
              condition: { label: 'is', id: '1' },
              filter: {
                label: 'Filter',
                id: 'filter',
                conditions: [{ label: 'is', id: '1' }],
                resolver: {
                  type: 'simple',
                  defaultValue: { value: 'item 1' },
                  items: [
                    { value: 'item 1' },
                    { value: 'item 2' },
                    { value: 'item 3' },
                  ],
                },
              },
              target: { value: 'item 1' },
            },
          ]}
          filters={[
            {
              label: 'Filter',
              id: 'filter',
              conditions: [{ label: 'is', id: '1' }],
              resolver: {
                type: 'simple',
                defaultValue: { value: 'item 1' },
                items: [
                  { value: 'item 1' },
                  { value: 'item 2' },
                  { value: 'item 3' },
                ],
              },
            },
          ]}
        />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <FilterBar
          label="Filter Bar"
          csx={{ bg: 'coral' }}
          data-testid="filter-bar"
          onStatementChange={() => {}}
          statements={[
            {
              condition: { label: 'is', id: '1' },
              filter: {
                label: 'Filter',
                id: 'filter',
                conditions: [{ label: 'is', id: '1' }],
                resolver: {
                  type: 'simple',
                  defaultValue: { value: 'item 1' },
                  items: [
                    { value: 'item 1' },
                    { value: 'item 2' },
                    { value: 'item 3' },
                  ],
                },
              },
              target: { value: 'item 1' },
            },
          ]}
          filters={[
            {
              label: 'Filter',
              id: 'filter',
              conditions: [{ label: 'is', id: '1' }],
              resolver: {
                type: 'simple',
                defaultValue: { value: 'item 1' },
                items: [
                  { value: 'item 1' },
                  { value: 'item 2' },
                  { value: 'item 3' },
                ],
              },
            },
          ]}
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
