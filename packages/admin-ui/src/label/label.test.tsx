import React from 'react'
import { render } from '../test-utils'

import { Label } from './label'

describe('Label tests', () => {
  it('renders', async () => {
    const { container } = render(
      <>
        <Label htmlFor="text-id">Text Input Label!</Label>
        <input type="text" id="text-id" />
        <Label>
          <input type="checkbox" />
          Checkbox Input Label!
        </Label>
      </>
    )

    expect(container).toBeInTheDocument()
  })
})
