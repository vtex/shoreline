import React from 'react'

import { render, withState, jestMatchMedia } from '../test-utils'

import { Checkbox, useCheckboxState, CheckboxGroup } from './index'

const StatefulCheckbox = withState(Checkbox, () => {
  const state = useCheckboxState({ initialValue: false })

  return { ...state, id: 'checkbox-test' }
})

describe('Checkbox', () => {
  beforeEach(jestMatchMedia)

  it('should show a help message', () => {
    const { getByText } = render(
      <StatefulCheckbox label="checkbox" helpText="Help Text" />
    )

    const textElement = getByText(/Help/)

    expect(textElement).toBeVisible()
    expect(textElement).toHaveTextContent('Help Text')
  })

  it('should show an error message', () => {
    const { getByText } = render(
      <StatefulCheckbox label="checkbox" errorText="Error Text" error />
    )

    const textElement = getByText(/Error/)

    expect(textElement).toBeVisible()
    expect(textElement).toHaveTextContent('Error Text')
  })

  it('should be in an optional checkbox group field', () => {
    const { getByText } = render(
      <CheckboxGroup label="checkbox group label" optional>
        <StatefulCheckbox id="checkbox1" label="checkbox1" />
        <StatefulCheckbox id="checkbox2" label="checkbox2" />
        <StatefulCheckbox id="checkbox3" label="checkbox3" />
      </CheckboxGroup>
    )

    const textElement = getByText(/optional/)

    expect(textElement).toBeVisible()
    expect(textElement).toHaveTextContent('checkbox group label (optional)')
  })

  it('should be in a checkbox group with a help message', () => {
    const { getByText } = render(
      <CheckboxGroup label="checkbox group label" helpText="Help Text">
        <StatefulCheckbox id="checkbox1" label="checkbox1" />
      </CheckboxGroup>
    )

    const textElement = getByText(/Help/)

    expect(textElement).toBeVisible()
    expect(textElement).toHaveTextContent('Help Text')
  })

  it('should be in a checkbox group with an error message', () => {
    const { getByText } = render(
      <CheckboxGroup label="checkbox group label" helpText="Error Text">
        <StatefulCheckbox id="checkbox1" label="checkbox1" />
      </CheckboxGroup>
    )

    const textElement = getByText(/Error/)

    expect(textElement).toBeVisible()
    expect(textElement).toHaveTextContent('Error Text')
  })
})
