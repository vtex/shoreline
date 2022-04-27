import React, { Fragment } from 'react'
import { render } from '../../test-utils'

import type { CheckboxStateReturn } from './checkbox-input'
import { Checkbox, useCheckboxState } from './checkbox-input'

function CheckboxState({
  children,
}: {
  children: (state: CheckboxStateReturn) => JSX.Element
}) {
  const state = useCheckboxState()

  return children(state)
}

describe('Checkbox tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <CheckboxState>
        {(state) => (
          <Checkbox
            state={state}
            data-testid="checkbox"
            value="checkbox"
            aria-label="checkbox"
            csx={{ bg: 'azure' }}
          />
        )}
      </CheckboxState>
    )

    expect(getByTestId('checkbox')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot with diferent sizes', () => {
    const { asFragment } = render(
      <Fragment>
        <CheckboxState>
          {(state) => (
            <Checkbox
              state={state}
              data-testid="checkbox"
              value="checkbox"
              aria-label="checkbox"
              size="regular"
            />
          )}
        </CheckboxState>
        <CheckboxState>
          {(state) => (
            <Checkbox
              state={state}
              data-testid="checkbox"
              value="checkbox"
              aria-label="checkbox"
              size="small"
            />
          )}
        </CheckboxState>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
