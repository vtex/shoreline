import React from 'react'
import { render } from '../../test-utils'

import { RadioGroup } from './index'
import type { RadioStateReturn } from '../Radio'
import { Radio, useRadioState } from '../Radio'

function RadioState({
  children,
}: {
  children: (state: RadioStateReturn) => JSX.Element
}) {
  const state = useRadioState({ baseId: 'id' })

  return children(state)
}

describe('RadioGroup tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <RadioState>
        {(state) => (
          <RadioGroup
            data-testid="radio-group"
            aria-label="fruits-group"
            id="radio-group-id"
            state={state}
            csx={{ bg: 'azure' }}
          >
            <Radio state={state} value="Apple" />
            <Radio state={state} value="Watermelon" />
            <Radio state={state} value="Orange" />
          </RadioGroup>
        )}
      </RadioState>
    )

    expect(getByTestId('radio-group')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot with diferent orientations', () => {
    const { asFragment } = render(
      <>
        <RadioState>
          {(state) => (
            <RadioGroup
              data-testid="radio-group"
              aria-label="fruits-group"
              id="radio-group-id"
              state={state}
              orientation="horizontal"
            >
              <Radio state={state} value="Apple" />
              <Radio state={state} value="Watermelon" />
              <Radio state={state} value="Orange" />
            </RadioGroup>
          )}
        </RadioState>
        <RadioState>
          {(state) => (
            <RadioGroup
              data-testid="radio-group"
              aria-label="fruits-group"
              id="radio-group-id"
              state={state}
              orientation="vertical"
            >
              <Radio state={state} value="Apple" />
              <Radio state={state} value="Watermelon" />
              <Radio state={state} value="Orange" />
            </RadioGroup>
          )}
        </RadioState>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
