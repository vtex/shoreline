import React from 'react'
import { render, axe } from '../../test-utils'
import type { UseSelectProps } from 'downshift'

import type { UseDropdownReturnValue } from './index'
import { Dropdown, useDropdownState } from './index'

interface DropdownStateProps<T> extends UseSelectProps<T> {
  children: (state: UseDropdownReturnValue<T>) => JSX.Element
}

function DropdownState<T>({ children, ...hookProps }: DropdownStateProps<T>) {
  const state = useDropdownState({ ...hookProps })

  return children(state)
}

describe('Dropdown tests', () => {
  beforeAll(() => {
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
      <DropdownState
        items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
        initialSelectedItem="7 days ago"
      >
        {(state) => (
          <Dropdown
            label="Date"
            items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
            state={state}
          />
        )}
      </DropdownState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
