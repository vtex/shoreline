import React from 'react'
import { render } from '../../test-utils'
import type { UseSelectProps } from 'downshift'

import type { UseSelectReturnValue } from './index'
import { Select, useSelectState } from './index'

interface SelectStateProps<T> extends UseSelectProps<T> {
  children: (state: UseSelectReturnValue<T>) => JSX.Element
}

function SelectState<T>({ children, ...hookProps }: SelectStateProps<T>) {
  const state = useSelectState({ ...hookProps })

  return children(state)
}

describe('Select tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <SelectState
        items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
        initialSelectedItem="7 days ago"
      >
        {(state) => (
          <Select
            data-testid="select"
            csx={{ backgroundColor: 'azure' }}
            label="Date"
            items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
            state={state}
          />
        )}
      </SelectState>
    )

    expect(getByTestId('select')).toHaveStyleRule('background-color', 'azure')
  })

  it('should render a Select with a list of string and other with a list of object', () => {
    const listItems = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']
    const objectItems = [
      { id: 1, label: 'Yesterday' },
      { id: 2, label: '7 days ago' },
      { id: 3, label: '28 days ago' },
      { id: 4, label: 'One year ago' },
    ]

    const { asFragment } = render(
      <>
        <SelectState items={listItems} initialSelectedItem="7 days ago">
          {(state) => <Select label="Date" items={listItems} state={state} />}
        </SelectState>
        <SelectState
          items={objectItems}
          initialSelectedItem={objectItems[1]}
          itemToString={(item) => item?.label ?? ''}
        >
          {(state) => (
            <Select
              label="Date"
              items={objectItems}
              state={state}
              renderItem={(item) => item?.label ?? ''}
            />
          )}
        </SelectState>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
