import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'
import { axe } from 'jest-axe'

import { FilterBar } from '../index'

import { useFilterBarState } from '../useFilterBarState'
import { UseFilterBarStateParams, UseFilterBarStateReturn } from '../typings'

interface FilterStateProps<T, V extends { value: T }>
  extends UseFilterBarStateParams<T, V> {
  children: (state: UseFilterBarStateReturn<T, V>) => JSX.Element
}

function FilterState<T, V extends { value: T }>({
  children,
  ...hookProps
}: FilterStateProps<T, V>) {
  const state = useFilterBarState({ ...hookProps })

  return children(state)
}

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

  const internalLabels = {
    conjunctionLabel: 'Conjunction',
    filterLabel: 'Filter',
    conditionLabel: 'Condition',
    statementMenuLabel: 'Statement Menu',
    applyFilterLabel: 'Apply',
    addFilterLabel: 'Add Filter',
    clearFilterLabel: 'Clear Filters',
    deleteStatementLabel: 'Delete',
    duplicateStatementLabel: 'Duplicate',
    whereStatementLabel: 'Where',
  }

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <FilterState conjunction={{ label: 'And', value: 'and' }}>
          {(state) => (
            <FilterBar
              filterBarState={state}
              label="Filter Bar"
              csx={{ bg: 'coral' }}
              data-testid="filter-bar"
              onApply={() => {}}
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
              conjunctions={[
                { label: 'And', value: 'and' },
                { label: 'Or', value: 'or' },
              ]}
              internalLabels={internalLabels}
            />
          )}
        </FilterState>
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
        <FilterState
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
          conjunction={{ label: 'And', value: 'and' }}
        >
          {(state) => (
            <FilterBar
              filterBarState={state}
              label="Filter Bar"
              csx={{ bg: 'coral' }}
              data-testid="filter-bar"
              onApply={() => {}}
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
              conjunctions={[
                { label: 'And', value: 'and' },
                { label: 'Or', value: 'or' },
              ]}
              internalLabels={internalLabels}
            />
          )}
        </FilterState>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <FilterState
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
          conjunction={{ label: 'And', value: 'and' }}
        >
          {(state) => (
            <FilterBar
              filterBarState={state}
              label="Filter Bar"
              csx={{ bg: 'coral' }}
              data-testid="filter-bar"
              onApply={() => {}}
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
              conjunctions={[
                { label: 'And', value: 'and' },
                { label: 'Or', value: 'or' },
              ]}
              internalLabels={internalLabels}
            />
          )}
        </FilterState>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
