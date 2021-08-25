import React from 'react'
import { render } from '../../test-utils'

import type { RadioStateReturn } from './index'
import { Radio, useRadioState } from './index'

function RadioState({
  children,
}: {
  children: (state: RadioStateReturn) => JSX.Element
}) {
  const state = useRadioState({ baseId: 'id' })

  return children(state)
}

describe('Radio tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <RadioState>
        {(state) => (
          <Radio
            state={state}
            data-testid="radio"
            value="radio"
            aria-label="radio"
            csx={{ bg: 'azure' }}
          />
        )}
      </RadioState>
    )

    expect(getByTestId('radio')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot with diferent sizes', () => {
    const { asFragment } = render(
      <>
        <RadioState>
          {(state) => (
            <Radio
              state={state}
              value="radio"
              aria-label="radio"
              size="regular"
            />
          )}
        </RadioState>
        <RadioState>
          {(state) => (
            <Radio
              state={state}
              value="radio"
              aria-label="radio"
              size="small"
            />
          )}
        </RadioState>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
