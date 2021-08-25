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

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <DropdownState
        items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
        initialSelectedItem="7 days ago"
      >
        {(state) => (
          <Dropdown
            data-testid="dropdown"
            csx={{ bg: 'azure' }}
            label="Date"
            items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
            state={state}
          />
        )}
      </DropdownState>
    )

    expect(getByTestId('dropdown')).toHaveStyleRule('background-color', 'azure')
  })

  it('should render a Dropdown with a list of string and other with a list of object', () => {
    const listItems = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']
    const objectItems = [
      { id: 1, label: 'Yesterday' },
      { id: 2, label: '7 days ago' },
      { id: 3, label: '28 days ago' },
      { id: 4, label: 'One year ago' },
    ]

    const { asFragment } = render(
      <>
        <DropdownState items={listItems} initialSelectedItem="7 days ago">
          {(state) => <Dropdown label="Date" items={listItems} state={state} />}
        </DropdownState>
        <DropdownState
          items={objectItems}
          initialSelectedItem={objectItems[1]}
          itemToString={(item) => item?.label ?? ''}
        >
          {(state) => (
            <Dropdown
              label="Date"
              items={objectItems}
              state={state}
              renderItem={(item) => item?.label ?? ''}
            />
          )}
        </DropdownState>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const species = ['Arabica', 'Robusta']
    const brewMethods = ['French Press', 'Chemex', 'Cold Brew', 'Aeropress']
    const recipes = ['Latte', 'Espresso', 'Irish Coffee']

    const { asFragment } = render(
      <>
        <DropdownState items={species} initialSelectedItem={species[0]}>
          {(state) => (
            <Dropdown label="Species" items={species} state={state} />
          )}
        </DropdownState>
        <DropdownState items={brewMethods} initialSelectedItem={brewMethods[0]}>
          {(state) => (
            <Dropdown
              variant="secondary"
              label="Brew Methods"
              items={brewMethods}
              state={state}
            />
          )}
        </DropdownState>
        <DropdownState items={recipes} initialSelectedItem={recipes[0]}>
          {(state) => (
            <Dropdown
              variant="tertiary"
              label="Recipes"
              items={recipes}
              state={state}
            />
          )}
        </DropdownState>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
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
