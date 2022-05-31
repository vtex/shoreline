import React from 'react'
import { render, axe } from '../../../test-utils'

import { FilterBar } from '../index'
import { useFilterBarState } from '../useFilterBarState'
import type {
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
} from '../typings'

interface FilterStateProps<T> extends UseFilterBarStateParams<T> {
  children: (state: UseFilterBarStateReturn<T>) => JSX.Element
}

function StatefulFilterBar<T, V extends { value: T }>({
  children,
  ...hookProps
}: FilterStateProps<V>) {
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

  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <StatefulFilterBar
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
          onApply={() => {}}
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
              state={state}
              label="Filter Bar"
              csx={{ bg: 'coral' }}
              data-testid="filter-bar"
              conjunctions={[
                { label: 'And', value: 'and' },
                { label: 'Or', value: 'or' },
              ]}
              internalLabels={internalLabels}
            />
          )}
        </StatefulFilterBar>
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
