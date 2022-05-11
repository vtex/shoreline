import React from 'react'

import { render, jestMatchMedia } from '../test-utils'

import { Checkbox } from '../checkbox'

import { FormControl, FormControlLabel, FormControlMessage } from './index'

describe('FormControl', () => {
  beforeEach(jestMatchMedia)

  it('should match snapshot', () => {
    const { asFragment } = render(
      <FormControl error optional>
        <FormControlLabel>Group Label</FormControlLabel>
        <Checkbox id="checkbox1" label="Checkbox 1" />
        <Checkbox id="checkbox2" label="Checkbox 2" />
        <FormControlMessage helpText="Help Text" errorText="Error Text" />
      </FormControl>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
