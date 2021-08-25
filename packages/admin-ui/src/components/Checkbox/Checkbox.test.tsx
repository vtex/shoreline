import React, { Fragment } from 'react'
import { render } from '../../test-utils'

import type { CheckboxStateReturn } from './index'
import { Checkbox, useCheckboxState } from './index'

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

    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('checkbox')).toHaveStyleRule('background-color', 'azure')
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
