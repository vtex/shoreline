import React from 'react'

import { render, withState, jestMatchMedia } from '../test-utils'

import { Checkbox, useCheckboxState, CheckboxGroup } from './index'

const StatefulCheckbox = withState(Checkbox, () => {
  const state = useCheckboxState({ initialValue: false })

  return { ...state, id: 'checkbox-test' }
})

describe('Checkbox', () => {
  beforeEach(jestMatchMedia)

  it('should match snapshot', () => {
    const { asFragment } = render(
      <StatefulCheckbox
        id="checkbox"
        label="checkbox"
        helpText="Help Text"
        errorText="Error text"
        error
        disabled
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

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

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <StatefulCheckbox
        id="checkbox-test"
        label="checkbox"
        value="checkbox"
        data-testid="checkbox-test"
        csx={{
          bg: 'azure',
          border: '1px solid gray',
        }}
      />
    )

    const checkbox = getByTestId('checkbox-test')

    expect(checkbox).toHaveStyleRule('background', 'azure')
    expect(checkbox).toHaveStyleRule('border', '1px solid gray')
  })

  it('should match snapshot to checkbox group', () => {
    const { asFragment } = render(
      <CheckboxGroup label="checkbox group label" optional>
        <StatefulCheckbox
          id="checkbox1"
          label="checkbox1"
          helpText="Hekp Text"
        />
        <StatefulCheckbox id="checkbox2" label="checkbox2" />
        <StatefulCheckbox
          id="checkbox3"
          label="checkbox3"
          errorText="Error Text"
          error
          checked
        />
        <StatefulCheckbox id="checkbox4" label="checkbox4" />
        <StatefulCheckbox id="checkbox5" label="checkbox5" />
      </CheckboxGroup>
    )

    expect(asFragment()).toMatchSnapshot()
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
